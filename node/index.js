import express from "express";
import "dotenv/config"
import cors from "cors";
import { connectDB } from "./utils/db.js";
import swaggerUi from "swagger-ui-express";
// import swaggerSpec from "./utils/swagger.js";

const app = express();
const port = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// Swagger docs route
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import authRoutes from "./routes/authRoutes.js";
import furnitureItemRouter from './routes/furnitureItem.js';
import furnitureRecommendationRouter from './routes/furnitureRecommendation.js';
import orderRouter from './routes/order.js';
import orderedItemRouter from './routes/orderedItem.js';
import userRouter from './routes/user.js';
import userInteractionRouter from './routes/userInteraction.js';
import userPreferenceRouter from './routes/userPreference.js';
import vendorRouter from './routes/vendor.js';
import vendorBookingViewRouter from './routes/vendorBookingView.js';
import wishlistRouter from './routes/wishlist.js';

app.use("/auth",authRoutes);
app.use('/furniture-items', furnitureItemRouter);
app.use('/furniture-recommendations', furnitureRecommendationRouter);
app.use('/orders', orderRouter);
app.use('/ordered-items', orderedItemRouter);
app.use('/users', userRouter);
app.use('/user-interactions', userInteractionRouter);
app.use('/user-preferences', userPreferenceRouter);
app.use('/vendors', vendorRouter);
app.use('/vendor-booking-views', vendorBookingViewRouter);
app.use('/wishlist', wishlistRouter);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}\nhttp://localhost:${port}`);
});

export default app;
