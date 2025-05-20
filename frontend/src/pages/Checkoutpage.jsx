import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import Card3 from "../components/Cards/Card3";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 280,
    },
  },
};

function getStyles(name, selectedAddress, theme) {
  return {
    fontWeight:
      selectedAddress === name
        ? theme.typography.fontWeightMedium
        : theme.typography.fontWeightRegular,
  };
}

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY;
function Checkoutpage() {
  const userdata = useSelector((state) => state.auth.user);
  const cartData = useSelector((state) => state.cart.items) || [];
  const userid = userdata.user.id;

  const [couponCode, setCouponCode] = useState("");
  const [finalPrice, setDiscount] = useState(null);
  const [address_id, setAddressid] = useState("");

  const [error, setError] = useState(false);
  const [cod, setCod] = useState(false);
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  // fetching cart items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        // Transform cart data into the required format
        const formattedItems = cartData.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.cost,
        }));

        setItems(formattedItems);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (userid) {
      fetchCartItems();
    }
  }, [userid]);

  // get total cost
  const getTotalCost = (cartItems) => {
    return cartItems.reduce(
      (total, item) => total + item.quantity * item.cost,
      0
    );
  };

  // Usage
  const totalCost = getTotalCost(cartData);

  // handling adding address
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const [message, setMessage] = useState(null);

  // handling coupons and discount
  const handleCoupon = async () => {
    try {
      setError(false);
      setDiscount(null);
      const response = await axios.get("http://localhost:8000/api/v1/coupon", {
        params: { user_id: userid, coupon_code: couponCode },
      });

      const discountPercentage = response.data.discount;
      if (discountPercentage) {
        const discountedPrice =
          totalCost - (totalCost * discountPercentage) / 100;
        setDiscount(discountedPrice);
        setError(false);
      } else {
        setDiscount(totalCost);
        setError(true);
      }
    } catch (error) {
      setError(true);
      if (error.response) {
        setError(error.response.data.error || "Something went wrong");
      } else {
        setError("Network error, please try again");
      }
    }
  };

  //
  const order_data = {
    user_id: userid,
    total_amount: couponCode ? finalPrice : totalCost,
    address_id,
    items,
    coupon_code: couponCode ? couponCode : null,
    is_used: couponCode ? true : false,
    payment_method: cod ? "cod" : "online",
  };

  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => console.log("✅ Razorpay SDK loaded successfully!");
      document.body.appendChild(script);
    }
  }, []);

  // handle receipt
  const [order_id, setOrderId] = useState("");
  const sendTestReceipt = async (items) => {
    try {
      const orderDetails = {
        customerEmail: userdata.user.email,
        customerName: userdata.user.fullname,
        orderId: order_id,
        orderDate: new Date(),
        items,
        totalAmount: couponCode ? finalPrice : totalCost,
      };

      const response = await axios.post(
        "http://localhost:8000/api/v1/receipt/send-receipt",
        { orderDetails }
      );

      alert("Receipt sent successfully");
    } catch (error) {
      console.error("Receipt error:", error);
    }
  };

  //fetch order details
  const fetchOrderDetails = async (order_id) => {
    if (!order_id) {
      console.error("Order ID is undefined!"); // ✅ Prevents errors
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/order/details/${order_id}`
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };



  const onOrder = async (order_data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/order/",
        order_data
      );
      
      const { order_id, razorpayOrder } = response.data;

      setOrderId(order_id);
      console.log(order_id);
      

      if (!cod) {
        if (!window.Razorpay) {
          console.error("Razorpay SDK not loaded!");
          return;
        }

        const options = {
          key: RAZORPAY_KEY,
          amount: razorpayOrder.amount,
          currency: razorpayOrder.currency,
          name: "Your Store Name",
          description: "Order Payment",
          order_id: razorpayOrder.id,
          handler: async function (response) {
            const verifyResponse = await axios.post(
              "http://localhost:8000/api/v1/order/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                order_id,
              }
            );

            if (verifyResponse.data.success) {
              alert("Payment successful!");
              const data = await fetchOrderDetails(response.data.order_id);   // not sending receipt 

              await sendTestReceipt(data.items);
              navigate("/");
            } else {
              alert("Payment verification failed!");
            }
          },
          prefill: {
            name: "User Name",
            email: "user@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpayInstance = new window.Razorpay(options);
        razorpayInstance.open();
      } else {
        alert("Order placed successfully!");
        const data = await fetchOrderDetails(response.data.order_id);

        await sendTestReceipt(data.items);
        navigate("/");
      }

      return response.data;
    } catch (error) {
      console.error(
        "Error confirming order:",
        error.response?.data || error.message
      );
      alert("Order placement failed. Please try again.");
      throw error;
    }
  };

  const theme = useTheme();

  const [name, setName] = useState([]);
  const [addresses, setAddresses] = useState([]); // all the addresses
  const [selectedAddress, setSelectedAddress] = useState(""); //  selected address

  // fetch all the addresses
  const fetchAddresses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/address/${userid}`
      );
      setAddresses(response.data);
    } catch (err) {
      console.log("failed to fetch address");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const [address, setAddress] = useState([]); // object that stores address id and name

  useEffect(() => {
    if (addresses.length > 0) {
      const extractedNames = addresses.map((address) => ({
        id: address.id,
        name: address.address_name,
      }));

      setName(extractedNames);
    }
  }, [addresses]);

  // fetch the address by id
  const fetchAddressbyid = async (addressid) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/v1/address/${userid}/${address_id}`
      );
      setAddress(response.data);
    } catch (err) {
      console.log("Failed to fetch address:", err);
    }
  };

  // adding a new address
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/address/",
        data
      );
      setMessage("Address saved successfully!");
      fetchAddresses();
    } catch (error) {
      setMessage("Error saving address. Please try again.");
    }
  };

  // changing the pre existing address
  const handleChange = async (event) => {
    const selectedName = event.target.value;

    const selected = name.find((addr) => addr.name === selectedName);

    if (selected) {
      setAddressid(selected.id); // ✅ Store the ID of the selected address
      setSelectedAddress(selected.name);

      await fetchAddressbyid(selected.id);
    }
  };

  useEffect(() => {
    if (!address_id) {
      // ✅ Reset form when no address is selected
      reset({
        address_name: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        pincode: "",
        country: "",
      });
      return;
    }

    // ✅ Fetch and populate only if address_id exists
    fetchAddressbyid(address_id).then(() => {
      if (address && address.length > 0) {
        setValue("address_name", address[0]?.address_name || "");
        setValue("address_line1", address[0]?.address_line1 || "");
        setValue("address_line2", address[0]?.address_line2 || "");
        setValue("city", address[0]?.city || "");
        setValue("state", address[0]?.state || "");
        setValue("pincode", address[0]?.pincode || "");
        setValue("country", address[0]?.country || "");
      }
    });
  }, [address, address_id]);

  return (
    <div>
      {/* Checkout  */}
      <div className="flex h-screen w-screen mb-28">
        {/* adding address */}
        <div className="h-screen w-7/12 ">
          <div className="p-30 pb-3  border-gray-400 ">
            <div className="flex  items-center mb-2   gap-24">
              <h2 className="text-3xl font-semibold font-[inter] mb-3">
                Delivery
              </h2>
              {message && (
                <p className="text-center mb-4 text-blue-600">{message}</p>
              )}
              <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-single-name-label">Address</InputLabel>
                <Select
                  labelId="demo-single-name-label"
                  id="demo-single-name"
                  value={selectedAddress}
                  onChange={handleChange}
                  input={<OutlinedInput label="Address" />}
                  MenuProps={MenuProps}
                >
                  {name.map((address) => (
                    <MenuItem
                      key={address.id}
                      value={address.name}
                      style={getStyles(address.name, selectedAddress, theme)}
                    >
                      {address.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-3 space-y-3"
            >
              <input
                type="hidden"
                {...register("user_id", { required: true })}
                value={userid}
              />
              <input
                {...register("address_name", { required: true })}
                placeholder="address_name"
                className="w-9/12 p-3 border border-gray-300 rounded "
              />
              <input
                {...register("address_line1", { required: true })}
                placeholder="Address Line 1"
                className="w-9/12 p-3 border border-gray-300 rounded "
              />
              {errors.address_line1 && (
                <p className="text-red-500">Address Line 1 is required</p>
              )}

              <input
                {...register("address_line2")}
                placeholder="Address Line 2"
                className="w-9/12 p-3 border border-gray-300 rounded"
              />
              <input
                {...register("city", { required: true })}
                placeholder="City"
                className="w-9/12 p-3 border border-gray-300 rounded"
              />
              {errors.city && <p className="text-red-500">City is required</p>}

              <input
                {...register("state", { required: true })}
                placeholder="State"
                className="w-9/12 p-3 border  border-gray-300 rounded "
              />
              {errors.state && (
                <p className="text-red-500">State is required</p>
              )}

              <input
                {...register("pincode", { required: true })}
                placeholder="Pincode"
                className="w-9/12 p-3 border border-gray-300 rounded"
              />
              {errors.pincode && (
                <p className="text-red-500">Pincode is required</p>
              )}

              <input
                {...register("country", { required: true })}
                placeholder="Country"
                className="w-9/12 p-3 border border-gray-300 rounded"
              />
              {errors.country && (
                <p className="text-red-500">Country is required</p>
              )}

              <button
                type="submit"
                className="w-40 h-14 bg-[#0A0A0A] text-white p-1  rounded"
              >
                Save Address
              </button>
            </form>
          </div>
        </div>

        {/* placing order */}
        <div className="mt-36 ">
          {cartData.map((item) => (
            <Card3
              key={item.id} // Always provide a unique key
              main_image_link={item.main_image_link}
              name={item.name}
              cost={item.cost}
              quantity={item.quantity}
            />
          ))}

          <div className="flex flex-col gap-4 mt-10 ml-3">
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className={`w-full p-3 border rounded-lg outline-none transition ${
                error
                  ? "border-red-500 text-red-500"
                  : "border-gray-300 focus:border-[#0A0A0A]"
              }`}
            />
            <button
              onClick={handleCoupon}
              className="bg-[#0A0A0A] hover:bg-[#0a0a0aea] text-white px-4 py-2 rounded-lg transition"
            >
              Apply Coupon
            </button>
            {error && (
              <p className="text-red-500 text-sm">Invalid or expired coupon</p>
            )}
          </div>

          <div className="flex  space-x-8 mt-8 ml-5">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={!cod}
                onChange={() => setCod(false)}
                className="w-5 h-5"
              />
              <span className="text-lg">Online Payment</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={cod} // COD is selected when true
                onChange={() => setCod(true)}
                className="w-5 h-5"
              />
              <span className="text-lg">Cash on Delivery</span>
            </label>
          </div>

          <div className="flex  gap-44 mt-8 ml-2 mb-4">
            {" "}
            <h1 className=" font-[inter] font-semibold text-3xl">Total cost</h1>
            <div className="flex gap-4 mt-10 ml-2 mb-4 items-center">
              {finalPrice && finalPrice !== totalCost ? (
                <>
                  <h1 className="font-[inter] text-3xl">₹{finalPrice}</h1>
                  <h1 className="font-[inter] text-xl text-gray-500 line-through">
                    ₹{totalCost}
                  </h1>
                </>
              ) : (
                <h1 className="font-[inter] text-3xl">₹{totalCost}</h1>
              )}
            </div>
          </div>

          <button
            class="group relative h-12 overflow-hidden rounded-md bg-[#0A0A0A] px-6 text-neutral-50 transition hover:bg-black ml-3"
            onClick={() => onOrder(order_data)}
          >
            <span className="relative">confirm order</span>
            <div className="absolute inset-0 -top-[20px] flex h-[calc(100%+40px)] w-full justify-center">
              <div className="relative h-full w-8 bg-white/30 blur-md animate-pulse"></div>
            </div>
          </button>
        </div>
      </div>

      {/* banner image  */}
      <div className="h-44 w-screen bg-black">
        <img
          src="https://i.pinimg.com/736x/da/57/ba/da57ba95bc0d0c39a1447583a32da963.jpg"
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

export default Checkoutpage;
