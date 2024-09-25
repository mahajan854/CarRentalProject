import { createUrl, log } from "../utils/utils";
import axiosInstance from "../AxiosIntercepter";

export async function setReturnedStatus(id) {
  const url = createUrl(`/booking/returnCar/${id}`);
  try {
    const response = await axiosInstance.put(url);
    log(response.data);
    return response.data;
  } catch (ex) {
    log(ex);
    return null;
  }
}

export async function getAllBookings(id) {
  const url = createUrl(`/booking/allBookings/${id}`);
  try{
    const response = await axiosInstance.get(url);
    log(response.data);
    return response.data;
  }catch(ex){
    log(ex)
    return null;
  }
}

export async function getCancelledBookings(id) {
  const url = createUrl(`/booking/toRefund/${id}`);
  try{
    const response = await axiosInstance.get(url)
    log(response.data)
    return response.data
  }catch(ex){
    log(ex)
    return null;
  }
}

export async function refundAmount(cancelStatusById) {
  const url = createUrl(`/booking/processRefund`);
  const body = {
    cancellationId: cancelStatusById.cancellationId,
    transactionId: cancelStatusById.transactionId
  }
  try{
    const response = await axiosInstance.post(url,body)
    log(response.data)
    return response.data
  }catch(ex){
    log(ex)
    return null;
  }
}
