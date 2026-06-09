"use client";
import { createContext, useContext, useReducer, useEffect } from "react";
import { toast } from "react-toastify";

// Valid Coupons
const COUPONS = {
  SUMMER10: { type: "percent", value: 10, label: "10% off" },
};

// Initial State
const initialState = {
  cartItems: [],
  wishlist: [],
  couponCode: "",
  couponData: null,   // { type, value, label }
  couponError: "",
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const exists = state.cartItems.find((i) => i.id === action.product.id);
      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.product, quantity: 1 }],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i.id !== action.id),
      };

    case "UPDATE_QUANTITY": {
      if (action.quantity < 1) {
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i.id !== action.id),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
        ),
      };
    }

    case "CLEAR_CART":
      return { ...state, cartItems: [], couponCode: "", couponData: null, couponError: "" };

    // Wishlist
    case "TOGGLE_WISHLIST": {
      const inList = state.wishlist.find((i) => i.id === action.product.id);
      return {
        ...state,
        wishlist: inList
          ? state.wishlist.filter((i) => i.id !== action.product.id)
          : [...state.wishlist, action.product],
      };
    }

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter((i) => i.id !== action.id),
      };

    // Coupon
    case "APPLY_COUPON": {
      const code = action.code.trim().toUpperCase();
      const coupon = COUPONS[code];
      if (!coupon) {
        return { ...state, couponCode: action.code, couponData: null, couponError: "Invalid coupon code." };
      }
      return { ...state, couponCode: code, couponData: coupon, couponError: "" };
    }

    case "REMOVE_COUPON":
      return { ...state, couponCode: "", couponData: null, couponError: "" };

    case "SET_COUPON_CODE":
      return { ...state, couponCode: action.code, couponError: "" };

    case "HYDRATE":
      return action.state;

    default:
      return state;
  }
}

// Context
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Persist to localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("suncart_store");
      if (saved) dispatch({ type: "HYDRATE", state: JSON.parse(saved) });
    } catch { }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("suncart_store", JSON.stringify(state));
    } catch { }
  }, [state]);

  // Derived values
  const subtotal = state.cartItems.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const discount = state.couponData
    ? state.couponData.type === "percent"
      ? (subtotal * state.couponData.value) / 100
      : Math.min(state.couponData.value, subtotal)
    : 0;

  const total = Math.max(0, subtotal - discount);
  const cartCount = state.cartItems.reduce((n, i) => n + i.quantity, 0);
  const wishlistCount = state.wishlist.length;

  // Action helpers
  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", product });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (id) => dispatch({ type: "REMOVE_FROM_CART", id });

  const updateQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_QUANTITY", id, quantity });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const toggleWishlist = (product) => {
    const inList = state.wishlist.find((i) => i.id === product.id);
    dispatch({ type: "TOGGLE_WISHLIST", product });
    toast.info(inList ? `Removed from wishlist` : `${product.name} wishlisted!`);
  };

  const removeFromWishlist = (id) =>
    dispatch({ type: "REMOVE_FROM_WISHLIST", id });

  const setCouponCode = (code) =>
    dispatch({ type: "SET_COUPON_CODE", code });

  const applyCoupon = (code) => dispatch({ type: "APPLY_COUPON", code });

  const removeCoupon = () => dispatch({ type: "REMOVE_COUPON" });

  const isInWishlist = (id) => !!state.wishlist.find((i) => i.id === id);
  const isInCart = (id) => !!state.cartItems.find((i) => i.id === id);

  return (
    <CartContext.Provider
      value={{
        ...state,
        subtotal,
        discount,
        total,
        cartCount,
        wishlistCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        removeFromWishlist,
        setCouponCode,
        applyCoupon,
        removeCoupon,
        isInWishlist,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
