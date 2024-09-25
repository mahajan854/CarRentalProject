import { createUrl, log } from "../utils/utils";
import axiosInstance from "../AxiosIntercepter";

export async function getCars(id) {
  const url = createUrl(`/branches/${id}/allCars`);
  try {
    debugger
    const response = await axiosInstance.get(url);
    debugger
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function getCarDetails(carId) {
  const url = createUrl(`/cars/car/${carId}`);
  try {
    const response = await axiosInstance.get(url);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function editCar(car) {
  const url = createUrl("/cars/update");
  const body = {
    vehicleNo: car.vehicleNo,
    brand: car.brand,
    model: car.model,
    makeYear: car.makeYear,
    fuelType: car.fuelType,
    driveType: car.driveType,
    category: car.category,
    seatingCapacity: car.seatingCapacity,
    haveABS: car.haveABS,
    haveAirBags: car.haveAirBags,
    baseFare: car.baseFare,
    status: car.status,
  };
  try {
    debugger;
    const response = await axiosInstance.put(url, body);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function addCar(car) {
  const url = createUrl("/cars/add");
  debugger;
  const body = {
    vehicleNo: car.vehicleNo,
    brand: car.brand,
    model: car.model,
    makeYear: car.makeYear,
    fuelType: car.fuelType,
    driveType: car.driveType,
    category: car.category,
    seatingCapacity: car.seatingCapacity,
    haveABS: car.haveABS,
    haveAirBags: car.haveAirBags,
    baseFare: car.baseFare,
    branchId: car.branchId,
    imageUrl: car.imageUrl,
  };
  try {
    const response = await axiosInstance.post(url, body);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function setStatus(id, status) {
  const url = createUrl("/cars/setStatus");
  const body = {
    car_id: id,
    status,
  };
  try {
    const response = await axiosInstance.put(url, body);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}
