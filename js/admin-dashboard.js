let generateMonthlyReportButton;
let generateDailyReportButton;
let monthSelect;
let daySelect;
let yearSelect;

document.addEventListener('DOMContentLoaded', function() {
    monthSelect = document.getElementById('month');
    daySelect = document.getElementById('day');
    yearSelect = document.getElementById('year');
    generateMonthlyReportButton = document.getElementById('generate-monthly-report');
    generateDailyReportButton = document.getElementById('generate-daily-report');

    // Add event listeners to generate report buttons
    if (generateMonthlyReportButton) {
        generateMonthlyReportButton.addEventListener('click', printMonthlyReport);
    }
    if (generateDailyReportButton) {
        generateDailyReportButton.addEventListener('click', printDailyReport);
    }

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

// Function to fetch accounts
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

let detailedCartData = [];

// Function to get orders for the selected month and year
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

            // Store filtered orders in detailedCartData for PDF generation
            detailedCartData = filteredOrders;
        }
    };
    xhr.open("GET", "../backend/cart.php", true);
    xhr.send();
}

// Function to fetch sales for the selected day
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

// Function to print the monthly report
function printMonthlyReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

       // Add title
       doc.setFontSize(18);
       doc.text('Monthly Sales Report', 14, 22);
   
       // Add date range
       const selectedMonth = monthSelect.value;
       const selectedYear = yearSelect.value;
       const monthName = monthSelect.options[parseInt(selectedMonth) - 1].text;
       doc.setFontSize(12);
       doc.text(`Month: ${monthName} ${selectedYear}`, 14, 32);
   
       // Add account, orders, and sales summary
       const totalAccounts = document.getElementById('account').innerText;
       const totalOrders = document.getElementById('orders').innerText;
       let totalSalesText = document.getElementById('sales').innerText;
        let totalSales = totalSalesText.replace("₱ ", "");

   
       doc.text(`Total Accounts: ${totalAccounts}`, 14, 42);
       doc.text(`Orders this Month: ${totalOrders}`, 14, 52);
       doc.text(`Sales this Month: Php ${totalSales}`, 14, 62);
   
       // Add detailed cart data as a table
       doc.setFontSize(14);
       doc.text('Detailed Orders:', 14, 72);
   
       // Create an array to hold the table data
       const tableData = detailedCartData.map((order, index) => [
           index + 1, // Order number
           order.username,
           order.product_name,
           order.anime,
           `P ${order.price}`,
           order.number_of_items,
           `P ${order.shipping_fee}`,
           `P ${order.total}`,
           order.date_ordered,
           order.status
       ]);

       // Adjust column widths for better readability
        const columnStyles = {
            0: { cellWidth: 10 },   // Order #
            1: { cellWidth: 25 },   // Username
            2: { cellWidth: 25 },   // Product Name
            3: { cellWidth: 25 },   // Anime
            4: { cellWidth: 15 },   // Price
            5: { cellWidth: 15 },   // Number of Items
            6: { cellWidth: 15 },   // Shipping Fee
            7: { cellWidth: 20 },   // Total
            8: { cellWidth: 25 },   // Date Ordered
            9: { cellWidth: 20 }    // Status
        };
   
       // Define the column headers
       const headers = ['', 'Username', 'Product', 'Anime', 'Price', 'Items', 'Fee', 'Total', 'Date Ordered', 'Status'];
   
       // Auto-generate the table
       doc.autoTable({
           head: [headers],
           body: tableData,
           startY: 80,
           margin: { top: 10 },
           styles: { fontSize: 10 }, // Adjust font size
            columnStyles: columnStyles // Apply column styles
       });
   
       // Save the PDF
       doc.save('monthly-sales-report.pdf');
   }



   // Function to print the daily report
function printDailyReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add title
    doc.setFontSize(18);
    doc.text('Daily Sales Report', 14, 22);

    // Add date
    const selectedDay = daySelect.value;
    const selectedMonth = monthSelect.value;
    const selectedYear = yearSelect.value;
    const monthName = monthSelect.options[parseInt(selectedMonth) - 1].text;
    doc.setFontSize(12);
    doc.text(`Date: ${monthName} ${selectedDay}, ${selectedYear}`, 14, 32);

    // Add sales summary
    let totalSales = 0;

    // Filter orders for the selected day, month, and year
    const filteredOrders = detailedCartData.filter(order => {
        const orderDate = new Date(order.date_ordered);
        return orderDate.getDate() == selectedDay && orderDate.getMonth() + 1 == selectedMonth && orderDate.getFullYear() == selectedYear;
    });

    filteredOrders.forEach(order => {
        totalSales += parseFloat(order.total);
    });

    let totalSalesText = `Php ${totalSales}`;
    doc.text(`Sales Today: ${totalSalesText}`, 14, 42);
    

    // Add detailed cart data for the day as a table
    doc.setFontSize(14);
    doc.text('Detailed Orders:', 14, 52);

    // Define the column headers
    const headers = ['', 'Username', 'Product', 'Anime', 'Price', 'Items', 'Fee', 'Total', 'Date Ordered', 'Status'];

    const data = filteredOrders.map((order, index) => {
        return [
            index + 1, // Incrementing order number
            order.username,
            order.product_name,
            order.anime,
            `P ${order.price}`,
            order.number_of_items,
            `P ${order.shipping_fee}`,
            `P ${order.total}`,
            order.date_ordered,
            order.status
        ];
    });

    // Adjust column widths for better readability
    const columnStyles = {
        0: { cellWidth: 10 },   // Order #
        1: { cellWidth: 25 },   // Username
        2: { cellWidth: 25 },   // Product Name
        3: { cellWidth: 25 },   // Anime
        4: { cellWidth: 15 },   // Price
        5: { cellWidth: 15 },   // Number of Items
        6: { cellWidth: 15 },   // Shipping Fee
        7: { cellWidth: 20 },   // Total
        8: { cellWidth: 25 },   // Date Ordered
        9: { cellWidth: 20 }    // Status
    };


    // Auto-generate the table
    doc.autoTable({
        head: [headers],
        body: data,
        startY: 80,
        margin: { top: 10 },
        styles: { fontSize: 10 }, // Adjust font size
         columnStyles: columnStyles // Apply column styles
    });

    // Save the PDF
    doc.save('daily-sales-report.pdf');
}

// Event listener for generating daily report
generateDailyReportButton.addEventListener('click', function() {
    const selectedDay = daySelect.value;
    const selectedMonth = monthSelect.value;
    const selectedYear = yearSelect.value;

    // Fetch orders for the selected day to ensure the latest data
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

            // Store filtered orders in detailedCartData for PDF generation
            detailedCartData = filteredOrders;

            // Print the daily report
            printDailyReport();
        }
    };
    xhr.open("GET", "../backend/cart.php", true);
    xhr.send();
});

