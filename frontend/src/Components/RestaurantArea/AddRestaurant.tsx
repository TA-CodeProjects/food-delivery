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
        name: yup.string().min(3).max(30).required("Restaurant name is required")
    });

    const {
      register,
      handleSubmit,
      formState: { errors, isDirty, isValid },
    } = useForm<RestaurantPayloadModel>({ mode: "all", resolver: yupResolver(schema) });

    const addRestaurant = (model: RestaurantPayloadModel) => {
      const restaurant = new RestaurantPayloadModel(model.name);
      dispatch(createRestaurant(restaurant));
    };

    useEffect(() => {
        if (isError) {
            toast.error(message)
        }
        if (isSuccess) {
            navigate("/")
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