const orderId = new URL(location.href).searchParams.get("orderID")
document.querySelector("#orderId").innerText = orderId