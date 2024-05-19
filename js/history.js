let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                let carts = JSON.parse(xhr.responseText);
                const dom = document.querySelector(".contents");

                carts.forEach(order => {
                    if(order.status === "pending" || order.status === "delivered"){
                        const div = document.createElement("div");
                        div.classList.add("content");


                        const details_left = document.createElement("div");
                        details_left.classList.add("left");
                        const details_right = document.createElement("div");
                        details_right.classList.add("right");


                        let name = document.createElement("span");
                        let product = document.createElement("span");
                        let quantity = document.createElement("span");
                        let total = document.createElement("span");
                        let mode = document.createElement("span");
                        let date = document.createElement("span");
                        name.textContent = "Username : " + order.username;
                        product.textContent = "Product : " + order.product_name;
                        quantity.textContent = "Items : " + order.number_of_items;
                        total.textContent = "Total : ₱ " + order.total;
                        mode.textContent = order.online_payment == "yes" ? "Payment : GCash" : "Payment : COD";
                        date.textContent = "Date Ordered : " + order.date_ordered;

                        details_left.appendChild(name);
                        details_left.appendChild(product);
                        details_left.appendChild(quantity);
                        details_right.appendChild(total);
                        details_right.appendChild(mode);
                        details_right.appendChild(date);

                        div.appendChild(details_left);
                        div.appendChild(details_right);
                        dom.appendChild(div);
                    }
                });
            }
        };
        xhr.open("GET", "../backend/cart.php", true);
        xhr.send();