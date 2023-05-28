import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {  RestaurantPayloadModel } from "../../Models/RestaurantModel";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { createRestaurant, reset } from "../../features/restaurants/restaurantSlice";
import Spinner from "../../Services/Spinner";

function AddRestaurant() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const {restaurants, isLoading, isError, isSuccess, message} = useAppSelector(
        (state) => state.restaurants
    );

    const schema = yup.object().shape({
      name: yup.string().min(3).max(30).required("Restaurant name is required"),
      description: yup.string().min(3).max(50).required("Description is required"),
      deliveryTime: yup.string().min(3).max(10).required("Delivery time is required"),
      deliveryCost: yup.number().min(0).required("Delivery cost is required"),
      image: yup.string().required("Image url is required"),
    });

    const {
      register,
      handleSubmit,
      formState: { errors, isDirty, isValid },
    } = useForm<RestaurantPayloadModel>({ mode: "all", resolver: yupResolver(schema) });

    const addRestaurant = (model: RestaurantPayloadModel) => {
      dispatch(createRestaurant(model));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate("/restaurant");
        }

        dispatch(reset())

    }, [restaurants, isError, isSuccess, message, navigate, dispatch])

    if (isLoading) {
        return <Spinner />
    }

    return (
      <>
        <section className="heading">
          <p>Please add a restaurant</p>
        </section>

        <section className="form">
          <form onSubmit={handleSubmit(addRestaurant)}>
            <div className="form-group">
              <input
                {...register("name")}
                type="text"
                className="form-control"
                placeholder="Enter restaurant name"
              />
              <span className="">{errors.name?.message}</span>
            </div>
            <div className="form-group">
              <input
                {...register("description")}
                type="text"
                className="form-control"
                placeholder="Enter description"
              />
              <span className="">{errors.description?.message}</span>
            </div>
            <div className="form-group">
              <input
                {...register("deliveryTime")}
                type="text"
                className="form-control"
                placeholder="Enter delivery time in minutes e.g. 30-40"
              />
              <span className="">{errors.deliveryTime?.message}</span>
            </div>
            <div className="form-group">
              <input
                {...register("deliveryCost")}
                type="number"
                className="form-control"
                placeholder="Enter delivery cost"
              />
              <span className="">{errors.deliveryCost?.message}</span>
            </div>
            <div className="form-group">
              <input
                {...register("image")}
                type="text"
                className="form-control"
                placeholder="Enter image url"
              />
              <span className="">{errors.image?.message}</span>
            </div>
            <div className="form-group">
              <button disabled={!isValid || !isDirty} type="submit" className="btn btn block">
                Add Restaurant
              </button>
            </div>
          </form>
        </section>
      </>
    );
}

export default AddRestaurant;