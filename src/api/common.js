export const errorHandler = (err) => {
  if (err?.response?.status === 401) {
    alert("we couldn't verify your credentials, please login again!")
  }
  throw Error(err?.response?.data?.error || "something went wrong!");
}