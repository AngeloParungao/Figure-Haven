document.addEventListener('DOMContentLoaded', function() {
    const monthSelect = document.getElementById('month');
    const daySelect = document.getElementById('day');
    const yearSelect = document.getElementById('year');

    // Populate month dropdown
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    months.forEach((month, index) => {
        const option = document.createElement('option');
        option.value = index + 1; // Months are 1-12
        option.textContent = month;
        monthSelect.appendChild(option);
    });

    // Populate year dropdown
    const currentYear = new Date().getFullYear();
    const endYear = currentYear + 10; // You can adjust the range of years here
    for (let year = currentYear; year <= endYear; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }

    // Get today's date
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth() + 1; // Months are 0-based, so add 1
    const currentYearValue = today.getFullYear();


    // Set selected index for day, month, and year dropdowns
    
    daySelect.selectedIndex = currentDay - 1; // Default to the first day if current day is not found
    monthSelect.selectedIndex = currentMonth - 1; // Months are 1-based
    yearSelect.selectedIndex = currentYearValue - currentYear;

    // Function to populate day dropdown based on selected month and year
    // Function to populate day dropdown based on selected month and year
    function populateDays() {
        const selectedMonth = monthSelect.value;
        const selectedYear = yearSelect.value;
    
        // Get number of days in the selected month and year
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
    
        // Clear previous options
        daySelect.innerHTML = '';
    
        // Populate day dropdown
        for (let day = 1; day <= daysInMonth; day++) {
            const option = document.createElement('option');
            option.value = day;
            option.textContent = day;
            daySelect.appendChild(option);
        }
    
        // Set selected index for day dropdown
        const selectedDay = daySelect.value;
        daySelect.selectedIndex = selectedDay - 1; // Days are 1-based, but array indexing is 0-based
    
        // Fetch orders for the selected month and year
        getOrders(selectedMonth, selectedYear);
        getSalesForDay(selectedDay, selectedMonth, selectedYear);
    }
    



    // Add event listeners to populate days and orders when month or year changes
    monthSelect.addEventListener('change', populateDays);
    yearSelect.addEventListener('change', populateDays);
    daySelect.addEventListener('change', function() {
        const selectedDay = daySelect.value;
        const selectedMonth = monthSelect.value;
        const selectedYear = yearSelect.value;
        getSalesForDay(selectedDay, selectedMonth, selectedYear);
    });

    // Initialize day dropdown and orders
    populateDays();

    // Fetch the number of accounts
    getAccounts();
});







function getAccounts() {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let users = JSON.parse(this.responseText);
            let numberOfAccounts = users.length;
            document.getElementById("account").innerText = numberOfAccounts;
        }
    };
    xhr.open("GET", "../backend/index.php", true);
    xhr.send();
}


function getOrders(month, year) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let orders = JSON.parse(this.responseText);
            // Filter orders by the selected month, year, and status
            let filteredOrders = orders.filter(order => {
                let orderDate = new Date(order.date_ordered);
                let status = order.status.toLowerCase(); // Ensure status is case-insensitive
                return (
                    (orderDate.getMonth() + 1 == month) &&
                    (orderDate.getFullYear() == year) &&
                    (status === 'pending' || status === 'delivered')
                );
            });
            let numberOfOrders = filteredOrders.length;
            document.getElementById("orders").innerText = numberOfOrders;

            // Calculate total sales for the month
            let totalSales = filteredOrders.reduce((sum, order) => sum + parseFloat(order.total), 0);
            document.getElementById("sales").innerText = "₱ " + totalSales;
        }
    };
    xhr.open("GET", "../backend/cart.php", true);
    xhr.send();
}

// Fetch sales for the selected day
function getSalesForDay(selectedDay, selectedMonth, selectedYear) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) { 
            let orders = JSON.parse(this.responseText);
        
            // Filter orders for the selected day, month, and year
            let filteredOrders = orders.filter(order => {
                let orderDateParts = order.date_ordered.split('-');
                let orderYear = parseInt(orderDateParts[0]);
                let orderMonth = parseInt(orderDateParts[1]);
                let orderDay = parseInt(orderDateParts[2]);

                return (
                    orderDay == selectedDay &&
                    orderMonth == selectedMonth &&
                    orderYear == selectedYear &&
                    (order.status === 'pending' || order.status === 'delivered')
                );
            });
            
            let totalSales = filteredOrders.reduce((sum, order) => sum + parseFloat(order.total), 0);
            
            document.getElementById("today-sales").innerText = "₱ " + totalSales; // Display sales for the day
        
        }
    };
    xhr.open("GET", "../backend/cart.php", true);
    xhr.send();
}
