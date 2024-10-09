import User from "../model/user.js";
import Order from "../model/order.js";

export const placeOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { order } = req.body;

    for (const orderData of order) {
      const newOrder = new Order({ user: user._id, book: orderData._id });
      const orderFromDB = await newOrder.save();
      //saving order in userModel
      await User.findByIdAndUpdate(user._id, {
        $push: { orders: orderFromDB._id },
      });
      //clear cart
      await User.findByIdAndUpdate(user._id, {
        $pull: { cart: orderData._id },
      });
    }
    res.status(200).json({ message: "Order placed successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get the order of specific user
export const getOrders = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "orders",
      populate: {
        path: "book",
      },
    });
    const userData = user.orders.reverse();
    res.status(200).json({ status: true, data: userData });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get all orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate({
        path: "book",
      })
      .populate({
        path: "user",
      })
      .sort({ createdAt: -1 });
    res.status(200).json({ status: true, data: orders });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// update order
export const updateOrder = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.role !== "admin")
      return res.status(400).json({
        message: "Only admin can update order status",
      });
    const { id } = req.params;
    await Order.findByIdAndUpdate(id, { status: req.body.status });
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
