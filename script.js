document.addEventListener('DOMContentLoaded', function () {
    // Constantes pour les éléments du formulaire et les tableaux
    const salesForm = document.getElementById('sales-form');
    const supplyForm = document.getElementById('supply-form');
    const employeeForm = document.getElementById('employee-form');
    const learnerForm = document.getElementById('learner-form');
    const mobileMoneyForm = document.getElementById('mobile-money-form');
    const creditorForm = document.getElementById('creditor-form');

    const salesTable = document.getElementById('sales-table').querySelector('tbody');
    const expensesTable = document.getElementById('expenses-table').querySelector('tbody');
    const othersTable = document.getElementById('others-table').querySelector('tbody');
    const stockTable = document.getElementById('stock-table').querySelector('tbody');
    const supplyTable = document.getElementById('supply-table').querySelector('tbody');
    const employeesTable = document.getElementById('employees-table').querySelector('tbody');
    const learnersTable = document.getElementById('learners-table').querySelector('tbody');
    const mobileMoneyTable = document.getElementById('mobile-money-table').querySelector('tbody');
    const creditorsTable = document.getElementById('creditors-table').querySelector('tbody');

    const showSalesDetailsButton = document.getElementById('show-sales-details');
    const showExpensesDetailsButton = document.getElementById('show-expenses-details');
    const showOthersDetailsButton = document.getElementById('show-others-details');
    const salesDetails = document.getElementById('sales-details');
    const expensesDetails = document.getElementById('expenses-details');
    const othersDetails = document.getElementById('others-details');

    // ... (autres constantes restent inchangées) ...
    const printSalesButton = document.getElementById('print-sales');
    const printExpensesButton = document.getElementById('print-expenses');
    const printOthersButton = document.getElementById('print-others');
    const printSupplyButton = document.getElementById('print-supply');
    const printEmployeesButton = document.getElementById('print-employees');
    const printLearnersButton = document.getElementById('print-learners');
    const printMobileMoneyButton = document.getElementById('print-mobile-money');
    const printCreditorsButton = document.getElementById('print-creditors');

    const exportSalesExcelButton = document.getElementById('export-sales-excel');
    const exportExpensesExcelButton = document.getElementById('export-expenses-excel');
    const exportOthersExcelButton = document.getElementById('export-others-excel');
    const exportSupplyExcelButton = document.getElementById('export-supply-excel');
    const exportEmployeesExcelButton = document.getElementById('export-employees-excel');
    const exportLearnersExcelButton = document.getElementById('export-learners-excel');
    const exportMobileMoneyExcelButton = document.getElementById('export-mobile-money-excel');
    const exportCreditorsExcelButton = document.getElementById('export-creditors-excel');

    const exportSalesPdfButton = document.getElementById('export-sales-pdf');
    const exportExpensesPdfButton = document.getElementById('export-expenses-pdf');
    const exportOthersPdfButton = document.getElementById('export-others-pdf');
    const exportSupplyPdfButton = document.getElementById('export-supply-pdf');
    const exportEmployeesPdfButton = document.getElementById('export-employees-pdf');
    const exportLearnersPdfButton = document.getElementById('export-learners-pdf');
    const exportMobileMoneyPdfButton = document.getElementById('export-mobile-money-pdf');
    const exportCreditorsPdfButton = document.getElementById('export-creditors-pdf');

    const saleDesignationSelect = document.getElementById('sale-designation');
    const saleUnitPriceInput = document.getElementById('sale-unit-price');
    const saleQuantityInput = document.getElementById('sale-quantity');
    const expenseReasonInput = document.getElementById('expense-reason');
    const expenseAmountInput = document.getElementById('expense-amount');
    const otherDesignationInput = document.getElementById('other-designation');
    const otherQuantityInput = document.getElementById('other-quantity');
    const otherUnitPriceInput = document.getElementById('other-unit-price');
    const operationTypeSelect = document.getElementById('operation-type');
    const papeterieDetails = document.getElementById('papeterie-details');
    const depensesDetails = document.getElementById('depenses-details');
    const diversDetails = document.getElementById('divers-details');

    const showSupplySectionButton = document.getElementById('show-supply-section');
    const showSalesSectionButton = document.getElementById('show-sales-section');
    const showEmployeesSectionButton = document.getElementById('show-employees-section');
    const showLearnersSectionButton = document.getElementById('show-learners-section');
    const showMobileMoneySectionButton = document.getElementById('show-mobile-money-section');
    const showCreditorsSectionButton = document.getElementById('show-creditors-section');
    const showReportSectionButton = document.getElementById('show-report-section');
    const showStockSectionButton = document.getElementById('show-stock-section');

    const supplySection = document.getElementById('supply-section');
    const salesSection = document.getElementById('sales-section');
    const employeesSection = document.getElementById('employees-section');
    const learnersSection = document.getElementById('learners-section');
    const mobileMoneySection = document.getElementById('mobile-money-section');
    const stockSection = document.getElementById('stock-section');
    const creditorsSection = document.getElementById('creditors-section');
    const reportSection = document.getElementById('report-section');

    const dailyReportButton = document.getElementById('daily-report');
    const monthlyReportButton = document.getElementById('monthly-report');
    const yearlyReportButton = document.getElementById('yearly-report');
    const reportFilters = document.getElementById('report-filters');
    const dailyFilter = document.getElementById('daily-filter');
    const monthlyFilter = document.getElementById('monthly-filter');
    const yearlyFilter = document.getElementById('yearly-filter');
    const reportDateInput = document.getElementById('report-date');
    const reportMonthInput = document.getElementById('report-month');
    const reportYearInput = document.getElementById('report-year');
    const generateReportButton = document.getElementById('generate-report');

    const reportTableSection = document.getElementById('report-table-section');
    const reportTable = document.getElementById('report-table').querySelector('tbody');
    const printReportButton = document.getElementById('print-report');
    const exportReportExcelButton = document.getElementById('export-report-excel');
    const exportReportPdfButton = document.getElementById('export-report-pdf');

    // Weekly Report elements
    const weeklyReportButton = document.getElementById('weekly-report');
    const weeklyFilter = document.getElementById('weekly-filter');
    const reportWeekInput = document.getElementById('report-week');

    // Constantes pour la section Compte Crédit (MODIFIÉES)
    // Plus besoin de paymentMethodSelect, integralPaymentFields, tranchePaymentFields
    const amountToPayInput = document.getElementById('amount-to-pay'); // Montant à payer
    const remainingAmountToPayInput = document.getElementById('remaining-amount-to-pay'); // Montant restant à payer
    const creditorAmountInput = document.getElementById('creditor-amount'); //  conservé (mais plus utilisé directement)
    const trancheDueDateInput = document.getElementById('tranche-due-date');//  conservé
    const trancheAmountInput = document.getElementById('tranche-amount');// Ajout
    const remainingAmountInput = document.getElementById('remaining-amount');// Ajout

    // Variables pour stocker les données (utilisation de localStorage)
    let salesData = JSON.parse(localStorage.getItem('salesData')) || [];
    let expensesData = JSON.parse(localStorage.getItem('expensesData')) || [];
    let othersData = JSON.parse(localStorage.getItem('othersData')) || [];
    let supplyData = JSON.parse(localStorage.getItem('supplyData')) || [];
    let employeesData = JSON.parse(localStorage.getItem('employeesData')) || [];
    let learnersData = JSON.parse(localStorage.getItem('learnersData')) || [];
    let mobileMoneyData = JSON.parse(localStorage.getItem('mobileMoneyData')) || [];
    let creditorsData = JSON.parse(localStorage.getItem('creditorsData')) || [];
    let stockData = []; // Le stock est calculé, pas stocké directement

    // Fonctions d'initialisation et de mise à jour des tableaux

    function updateProductDesignations() {
        const designations = Array.from(new Set(supplyData.map(item => item.designation)));
        saleDesignationSelect.innerHTML = designations.map(designation => `<option value="${designation}">${designation}</option>`).join('');
    }

    // Fonctions de calcul (pour éviter la duplication de code)
    function calculateTotalCost() {
        const quantity = parseFloat(saleQuantityInput.value) || 0;
        const unitPrice = parseFloat(saleUnitPriceInput.value) || 0;
        const totalCost = quantity * unitPrice;
        document.getElementById('sale-total-cost').value = totalCost.toFixed(2);
    }

    function calculateOtherTotalCost() {
        const quantity = parseFloat(otherQuantityInput.value) || 0;
        const unitPrice = parseFloat(otherUnitPriceInput.value) || 0;
        const totalCost = quantity * unitPrice;
        document.getElementById('other-total-cost').value = totalCost.toFixed(2);
    }


    function setTodaysDate() {
        const today = new Date().toISOString().split('T')[0];
        document.getElementById('sale-date').value = today;
        document.getElementById('supply-date').value = today;
       if (document.getElementById('employee-hire-date')) {
            document.getElementById('employee-hire-date').value = today;
        }
        if (document.getElementById('learner-start-date')) {
            document.getElementById('learner-start-date').value = today;
        }
        if (document.getElementById('mm-date')) {
            document.getElementById('mm-date').value = today;
        }

        if (document.getElementById('creditor-due-date')) { // Pour le compte crédit
            document.getElementById('creditor-due-date').value = today;
        }

        if (document.getElementById('creditor-date')) { // Pour le compte crédit
            document.getElementById('creditor-date').value = today;
        }
        if (reportDateInput) {
            reportDateInput.value = today;
        }
    }

    function initializeData() {
        updateProductDesignations();
        updateSalesTable();
        updateExpensesTable();
        updateOthersTable();
        updateStockTable();
        updateSupplyTable();
        updateEmployeesTable();
        updateLearnersTable();
        updateMobileMoneyTable();
        updateCreditorsTable();
        setTodaysDate();
        handleOperationTypeChange();  // Pour la section Ventes/Divers
    }

    function updateSalesTable() {
        salesTable.innerHTML = '';
        salesData.forEach(sale => {
            const row = salesTable.insertRow();
            row.insertCell().textContent = sale.date;
            row.insertCell().textContent = sale.designation;
            row.insertCell().textContent = sale.quantity;
            row.insertCell().textContent = sale.unitPrice;
            row.insertCell().textContent = sale.totalCost;
        });
    }

    function updateExpensesTable() {
        expensesTable.innerHTML = '';
        expensesData.forEach(expense => {
            const row = expensesTable.insertRow();
            row.insertCell().textContent = expense.date;
            row.insertCell().textContent = expense.reason;
            row.insertCell().textContent = expense.amount;
        });
    }

    function updateOthersTable() {
        othersTable.innerHTML = '';
        othersData.forEach(other => {
            const row = othersTable.insertRow();
            row.insertCell().textContent = other.date;
            row.insertCell().textContent = other.designation;
            row.insertCell().textContent = other.quantity;
            row.insertCell().textContent = other.unitPrice ? other.unitPrice : "-"; // Gère les cas sans prix unitaire
            row.insertCell().textContent = other.totalCost ? other.totalCost : other.amount; // Affiche soit le coût total, soit le montant
        });
    }

    function updateSupplyTable() {
        supplyTable.innerHTML = '';
        supplyData.forEach(supply => {
            const row = supplyTable.insertRow();
            row.insertCell().textContent = supply.date;
            row.insertCell().textContent = supply.designation;
            row.insertCell().textContent = supply.quantity;
        });
    }

    function updateEmployeesTable() {
        employeesTable.innerHTML = '';
        employeesData.forEach(employee => {
            const row = employeesTable.insertRow();
            row.insertCell().textContent = employee.name;
            row.insertCell().textContent = employee.role;
            row.insertCell().textContent = employee.salary;
            row.insertCell().textContent = employee.hireDate;
            row.insertCell().textContent = employee.contact;
            row.insertCell().textContent = employee.contactPerson; // Ajout de la personne à contacter
        });
    }

    function updateLearnersTable() {
        learnersTable.innerHTML = '';
        learnersData.forEach(learner => {
            const row = learnersTable.insertRow();
            row.insertCell().textContent = learner.name;
            row.insertCell().textContent = learner.course;
            row.insertCell().textContent = learner.startDate;
            row.insertCell().textContent = learner.endDate;
            row.insertCell().textContent = learner.contact;
            row.insertCell().textContent = learner.contactPerson; // Ajout de la personne à contacter
        });
    }

    function updateMobileMoneyTable() {
        mobileMoneyTable.innerHTML = '';
        mobileMoneyData.forEach(transaction => {
            const row = mobileMoneyTable.insertRow();
            row.insertCell().textContent = transaction.date;
            row.insertCell().textContent = transaction.agent;
            row.insertCell().textContent = transaction.balanceMoov;
            row.insertCell().textContent = transaction.balanceMTN;
            row.insertCell().textContent = transaction.balanceCelttis;
            row.insertCell().textContent = transaction.balanceCash;
            const total = transaction.balanceMoov + transaction.balanceMTN + transaction.balanceCelttis + transaction.balanceCash;
            row.insertCell().textContent = total.toFixed(2);
        });
    }

   function updateCreditorsTable() {
        creditorsTable.innerHTML = '';
        creditorsData.forEach(creditor => {
            const row = creditorsTable.insertRow();
            row.insertCell().textContent = creditor.date;
            row.insertCell().textContent = creditor.name;
            row.insertCell().textContent = creditor.designation;
            row.insertCell().textContent = creditor.totalAmount.toFixed(2);
            row.insertCell().textContent = creditor.amountPaid.toFixed(2);
            let remaining = creditor.remainingAmount;
            row.insertCell().textContent = remaining.toFixed(2);
            row.insertCell().textContent = creditor.dueDate;
            row.insertCell().textContent = creditor.contact;
             // Conservez l'affichage du mode de paiement *dans le tableau*
            row.insertCell().textContent = creditor.paymentMethod;


            if (remaining <= 0) {
                row.classList.add('solde');
                const soldeCell = row.insertCell();
                soldeCell.textContent = "Compte Crédit Soldé";
                soldeCell.style.fontWeight = 'bold';
                soldeCell.style.color = 'green';
            }
        });
    }

    function updateStockTable() {
        stockTable.innerHTML = '';
        stockData = calculateStock(supplyData, salesData); // Calcule le stock
        stockData.forEach(stock => {
            const row = stockTable.insertRow();
            row.insertCell().textContent = stock.date;
            row.insertCell().textContent = stock.designation;
            row.insertCell().textContent = stock.supplyQuantity;
            row.insertCell().textContent = stock.soldQuantity;
            row.insertCell().textContent = stock.remainingQuantity;
        });
    }

    function calculateStock(supply, sales) {
        let stock = {};

        supply.forEach(item => {
            if (!stock[item.designation]) {
                stock[item.designation] = {
                    designation: item.designation,
                    supplyQuantity: 0,
                    soldQuantity: 0,
                    remainingQuantity: 0,
                    date: item.date
                };
            }
            stock[item.designation].supplyQuantity += item.quantity;
            stock[item.designation].remainingQuantity += item.quantity;
        });

        sales.forEach(item => {
            if (stock[item.designation]) {
                stock[item.designation].soldQuantity += item.quantity;
                stock[item.designation].remainingQuantity -= item.quantity;
                stock[item.designation].date = item.date; // Garde la date de la dernière transaction
            }
        });

        return Object.values(stock);
    }


    function handleOperationTypeChange() {
        if (operationTypeSelect.value === 'Papeterie') {
            papeterieDetails.style.display = 'flex';
            depensesDetails.style.display = 'none';
            diversDetails.style.display = 'none';
        } else if (operationTypeSelect.value === 'Dépenses') {
            papeterieDetails.style.display = 'none';
            depensesDetails.style.display = 'flex';
            diversDetails.style.display = 'none';
        } else { // Divers
            papeterieDetails.style.display = 'none';
            depensesDetails.style.display = 'none';
            diversDetails.style.display = 'flex';
        }
    }

    // Plus besoin de handlePaymentMethodChange car le select est supprimé du formulaire.


    // Gestionnaires d'événements pour les soumissions de formulaires

    salesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (operationTypeSelect.value === 'Papeterie') {
            const sale = {
                date: document.getElementById('sale-date').value,
                designation: saleDesignationSelect.value,
                quantity: parseFloat(saleQuantityInput.value) || 0,
                unitPrice: parseFloat(saleUnitPriceInput.value) || 0,
                totalCost: parseFloat(document.getElementById('sale-total-cost').value) || 0
            };
            salesData.push(sale);
            localStorage.setItem('salesData', JSON.stringify(salesData));
            updateSalesTable();

        } else if (operationTypeSelect.value === 'Dépenses') {
            const expense = {
                date: document.getElementById('sale-date').value,
                reason: expenseReasonInput.value,
                amount: parseFloat(expenseAmountInput.value) || 0
            };
            expensesData.push(expense);
            localStorage.setItem('expensesData', JSON.stringify(expensesData));
            updateExpensesTable();


        } else { // Divers
            const other = {
                date: document.getElementById('sale-date').value,
                designation: otherDesignationInput.value,
                quantity: parseFloat(otherQuantityInput.value) || 0,
                unitPrice: parseFloat(otherUnitPriceInput.value) || 0,
                totalCost: parseFloat(document.getElementById('other-total-cost').value) || 0
            };

            othersData.push(other);
            localStorage.setItem('othersData', JSON.stringify(othersData));
            updateOthersTable();
        }

        updateStockTable();
        salesForm.reset();
        setTodaysDate();
        handleOperationTypeChange();
    });

    supplyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const supply = {
            date: document.getElementById('supply-date').value,
            designation: document.getElementById('supply-designation').value,
            quantity: parseFloat(document.getElementById('supply-quantity').value)
        };
        supplyData.push(supply);
        localStorage.setItem('supplyData', JSON.stringify(supplyData)); // Sauvegarde
        updateSupplyTable();
        updateStockTable();
        updateProductDesignations(); // Met à jour le dropdown des désignations
        supplyForm.reset();
        setTodaysDate();
    });

    employeeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const employee = {
            name: document.getElementById('employee-name').value,
            role: document.getElementById('employee-role').value,
            salary: parseFloat(document.getElementById('employee-salary').value) || 0,
            hireDate: document.getElementById('employee-hire-date').value,
            contact: document.getElementById('employee-contact').value,
            contactPerson: document.getElementById('employee-contact-person').value
        };
        employeesData.push(employee);
        localStorage.setItem('employeesData', JSON.stringify(employeesData));
        updateEmployeesTable();
        employeeForm.reset();
        setTodaysDate();
    });

    learnerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const learner = {
            name: document.getElementById('learner-name').value,
            course: document.getElementById('learner-course').value,
            startDate: document.getElementById('learner-start-date').value,
            endDate: document.getElementById('learner-end-date').value,
            contact: document.getElementById('learner-contact').value,
            contactPerson: document.getElementById('learner-contact-person').value
        };
        learnersData.push(learner);
        localStorage.setItem('learnersData', JSON.stringify(learnersData));
        updateLearnersTable();
        learnerForm.reset();
        setTodaysDate();
    });

    mobileMoneyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const transaction = {
            date: document.getElementById('mm-date').value,
            agent: document.getElementById('mm-agent').value,
            balanceMoov: parseFloat(document.getElementById('mm-balance-moov').value) || 0,
            balanceMTN: parseFloat(document.getElementById('mm-balance-mtn').value) || 0,
            balanceCelttis: parseFloat(document.getElementById('mm-balance-celttis').value) || 0,
            balanceCash: parseFloat(document.getElementById('mm-balance-cash').value) || 0
        };
        mobileMoneyData.push(transaction);
        localStorage.setItem('mobileMoneyData', JSON.stringify(mobileMoneyData));
        updateMobileMoneyTable();
        mobileMoneyForm.reset();
        setTodaysDate();
    });

  creditorForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const date = document.getElementById('creditor-date').value;
    const name = document.getElementById('creditor-name').value;
    const designation = document.getElementById('creditor-designation').value;
    const amountToPay = parseFloat(document.getElementById('amount-to-pay').value) || 0; // Montant payé cette fois-ci
    const remainingAmountToPay = parseFloat(document.getElementById('remaining-amount-to-pay').value) || 0; // Total du
    const contact = document.getElementById('creditor-contact').value;
    const dueDate = document.getElementById('creditor-due-date').value;
    let paymentMethod = "tranche"; // Par défaut, on considère que c'est un paiement partiel.

    //Si le montant à payer est égale au  montant restant alors c'est un payement integral
    if(amountToPay === remainingAmountToPay){
        paymentMethod = "integral";
    }

    // On crée l'objet *avant* de chercher un créancier existant
    const creditor = {
        date,
        name,
        designation,
        totalAmount: remainingAmountToPay, // Le total à payer au départ.
        amountPaid: amountToPay,       // Ce qui est payé *maintenant*.
        remainingAmount: remainingAmountToPay - amountToPay, //  reste après *ce* paiement.
        dueDate,
        contact,
        paymentMethod // On enregistre *toujours* le mode de paiement
    };

    // Recherche d'un créancier existant (même nom + désignation)
    const existingCreditorIndex = creditorsData.findIndex(c =>
        c.name === creditor.name && c.designation === creditor.designation
    );
      if (existingCreditorIndex > -1) {
        // Mise à jour du créancier existant
        const existingCreditor = creditorsData[existingCreditorIndex];
        //existingCreditor.totalAmount = totalAmount;
        existingCreditor.amountPaid += amountToPay;  // Ajoute le paiement
        existingCreditor.remainingAmount -= amountToPay; //  le reste

        //Si le restant est négatif, le remettre à 0
         if(existingCreditor.remainingAmount < 0){
            existingCreditor.remainingAmount = 0;
         }
          //existingCreditor.dueDate = dueDate; //possible mise à jour de la date, si elle est modifié dans le formulaire
        if(dueDate){
            existingCreditor.dueDate = dueDate;
        }

        existingCreditor.paymentMethod = paymentMethod;
    }
    else {
        // Nouveau créancier :  on l'ajoute simplement.
        creditorsData.push(creditor);
    }

    localStorage.setItem('creditorsData', JSON.stringify(creditorsData));
    updateCreditorsTable();
    creditorForm.reset();
    setTodaysDate();
});

    // Gestionnaires d'événements pour afficher/masquer les détails

    showSalesDetailsButton.addEventListener('click', function () {
        toggleDetailsVisibility(salesDetails, [expensesDetails, othersDetails]);
    });

    showExpensesDetailsButton.addEventListener('click', function () {
        toggleDetailsVisibility(expensesDetails, [salesDetails, othersDetails]);
    });

    showOthersDetailsButton.addEventListener('click', function () {
        toggleDetailsVisibility(othersDetails, [salesDetails, expensesDetails]);
    });

    // Plus besoin de show/hide individuel pour les tables, géré par les sections
    // showStockSectionButton est conservé car il est spécifique au stock.
    showStockSectionButton.addEventListener('click', () => {
      stockSection.style.display = stockSection.style.display === 'none' ? 'block' : 'none';
    });


    function toggleDetailsVisibility(elementToShow, elementsToHide) {
        elementsToHide.forEach(el => el.style.display = 'none');
        elementToShow.style.display = elementToShow.style.display === 'none' ? 'block' : 'none';
    }

    // Gestionnaires d'événements pour la visibilité des sections

    showSupplySectionButton.addEventListener('click', function () {
        setSectionVisibility(supplySection, [salesSection, employeesSection, learnersSection, mobileMoneySection, reportSection, creditorsSection]);
        supplyTable.style.display = 'table'; // Affiche la table des approvisionnements
    });

    showSalesSectionButton.addEventListener('click', function () {
        setSectionVisibility(salesSection, [supplySection, employeesSection, learnersSection, mobileMoneySection, reportSection, creditorsSection]);
    });

    showEmployeesSectionButton.addEventListener('click', function () {
        setSectionVisibility(employeesSection, [supplySection, salesSection, learnersSection, mobileMoneySection, reportSection, creditorsSection]);
    });

    showLearnersSectionButton.addEventListener('click', function () {
        setSectionVisibility(learnersSection, [supplySection, salesSection, employeesSection, mobileMoneySection, reportSection, creditorsSection]);
    });

    showMobileMoneySectionButton.addEventListener('click', function () {
        setSectionVisibility(mobileMoneySection, [supplySection, salesSection, employeesSection, learnersSection, reportSection, creditorsSection]);
    });

    showCreditorsSectionButton.addEventListener('click', function () {
        setSectionVisibility(creditorsSection, [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, reportSection]);
    });

    showReportSectionButton.addEventListener('click', () => {
        setSectionVisibility(reportSection, [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection]);
    });

    function setSectionVisibility(sectionToShow, sectionsToHide) {
        sectionsToHide.forEach(section => section.style.display = 'none');
        sectionToShow.style.display = 'block';
    }

    // Gestionnaires d'événements pour l'impression et l'exportation

    printSalesButton.addEventListener('click', printTable);
    printExpensesButton.addEventListener('click', printTable);
    printOthersButton.addEventListener('click', printTable);
    printSupplyButton.addEventListener('click', printTable);
    printEmployeesButton.addEventListener('click', printTable);
    printLearnersButton.addEventListener('click', printTable);
    printMobileMoneyButton.addEventListener('click', printTable);
    printCreditorsButton.addEventListener('click', printTable);
    // Ajout event listener
    saleDesignationSelect.addEventListener('change', calculateTotalCost);
    saleQuantityInput.addEventListener('input', calculateTotalCost);
    saleUnitPriceInput.addEventListener('input', calculateTotalCost);
    otherQuantityInput.addEventListener('input', calculateOtherTotalCost);
    otherUnitPriceInput.addEventListener('input', calculateOtherTotalCost);

    function printTable() {
        window.print();
    }

    exportSalesExcelButton.addEventListener('click', () => exportToExcel('sales-table', 'Papeterie.xlsx'));
    exportExpensesExcelButton.addEventListener('click', () => exportToExcel('expenses-table', 'Dépenses.xlsx'));
    exportOthersExcelButton.addEventListener('click', () => exportToExcel('others-table', 'Divers.xlsx'));
    exportSupplyExcelButton.addEventListener('click', () => exportToExcel('supply-table', 'Approvisionnements.xlsx'));
    exportEmployeesExcelButton.addEventListener('click', () => exportToExcel('employees-table', 'Employes.xlsx'));
    exportLearnersExcelButton.addEventListener('click', () => exportToExcel('learners-table', 'Apprenants.xlsx'));
    exportMobileMoneyExcelButton.addEventListener('click', () => exportToExcel('mobile-money-table', 'MobileMoney.xlsx'));
    exportCreditorsExcelButton.addEventListener('click', () => exportToExcel('creditors-table', 'Creanciers.xlsx'));


    function exportToExcel(tableId, fileName) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.getElementById(tableId));
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
        XLSX.writeFile(wb, fileName);
    }

    exportSalesPdfButton.addEventListener('click', () => exportToPdf('sales-table', 'Papeterie.pdf'));
    exportExpensesPdfButton.addEventListener('click', () => exportToPdf('expenses-table', 'Dépenses.pdf'));
    exportOthersPdfButton.addEventListener('click', () => exportToPdf('others-table', 'Divers.pdf'));
    exportSupplyPdfButton.addEventListener('click', () => exportToPdf('supply-table', 'Approvisionnement.pdf'));
    exportEmployeesPdfButton.addEventListener('click', () => exportToPdf('employees-table', 'Employes.pdf'));
    exportLearnersPdfButton.addEventListener('click', () => exportToPdf('learners-table', 'Apprenants.pdf'));
    exportMobileMoneyPdfButton.addEventListener('click', () => exportToPdf('mobile-money-table', 'MobileMoney.pdf'));
    exportCreditorsPdfButton.addEventListener('click', () => exportToPdf('creditors-table', 'Creanciers.pdf'));


    function exportToPdf(tableId, fileName) {
        window.jsPDF = window.jspdf.jsPDF;  // Correction pour jsPDF
        const doc = new jsPDF();
        doc.autoTable({ html: '#' + tableId });
        doc.save(fileName);
    }

    // Gestionnaires d'événements pour les rapports (Journalier, Hebdomadaire, Mensuel, Annuel)

    dailyReportButton.addEventListener('click', function () {
        reportFilters.style.display = 'block';
        dailyFilter.style.display = 'flex';
        weeklyFilter.style.display = 'none';
        monthlyFilter.style.display = 'none';
        yearlyFilter.style.display = 'none';
        reportTableSection.style.display = 'none';
        setSectionVisibility(reportSection, [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection]); // Masque les autres sections
    });

    weeklyReportButton.addEventListener('click', function () {
        reportFilters.style.display = 'block';
        dailyFilter.style.display = 'none';
        weeklyFilter.style.display = 'flex';
        monthlyFilter.style.display = 'none';
        yearlyFilter.style.display = 'none';
        reportTableSection.style.display = 'none';
        setSectionVisibility(reportSection, [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection]); // Masque les autres sections

    });

    monthlyReportButton.addEventListener('click', function () {
        reportFilters.style.display = 'block';
        dailyFilter.style.display = 'none';
        weeklyFilter.style.display = 'none';
        monthlyFilter.style.display = 'flex';
        yearlyFilter.style.display = 'none';
        reportTableSection.style.display = 'none';
        setSectionVisibility(reportSection, [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection]); // Masque les autres sections

    });

    yearlyReportButton.addEventListener('click', function () {
        reportFilters.style.display = 'block';
        dailyFilter.style.display = 'none';
        weeklyFilter.style.display = 'none';
        monthlyFilter.style.display = 'none';
        yearlyFilter.style.display = 'flex';
        reportTableSection.style.display = 'none';
        setSectionVisibility(reportSection, [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection]); //
    });

    // Fonction principale pour générer le rapport (filtrage des données)
    generateReportButton.addEventListener('click', function () {
        let selectedDate = null;
        let selectedWeek = null;
        let selectedMonth = null;
        let selectedYear = null;

        if (dailyFilter.style.display === 'flex') {
            selectedDate = reportDateInput.value;
        } else if (weeklyFilter.style.display === 'flex') {
            selectedWeek = reportWeekInput.value;
        } else if (monthlyFilter.style.display === 'flex') {
            selectedMonth = reportMonthInput.value;
        } else if (yearlyFilter.style.display === 'flex') {
            selectedYear = reportYearInput.value;
        }

        // Fonction de filtrage générique (utilisée pour tous les types de données)
        const filterData = (data) => {
            return data.filter(item => {
                if (selectedDate) {
                    return item.date === selectedDate;
                } else if (selectedWeek) {
                    const [year, week] = selectedWeek.split('-W');
                    const startDate = getDateOfISOWeek(parseInt(week, 10), parseInt(year, 10));
                    const endDate = new Date(startDate);
                    endDate.setDate(startDate.getDate() + 6);
                    const itemDate = new Date(item.date);
                    return itemDate >= startDate && itemDate <= endDate;
                } else if (selectedMonth) {
                    const itemMonth = item.date.substring(0, 7);
                    return itemMonth === selectedMonth;
                } else if (selectedYear) {
                    const itemYear = item.date.substring(0, 4);
                    return itemYear === selectedYear;
                }
                return false; // Si aucun filtre n'est sélectionné, ne rien retourner
            });
        };

        // Filtrage des données pour chaque section
        const filteredSales = filterData(salesData);
        const filteredExpenses = filterData(expensesData);
        const filteredOthers = filterData(othersData);
        const filteredSupplies = filterData(supplyData);
        const filteredMobileMoney = filterData(mobileMoneyData);

        // Mise à jour du tableau de rapport avec les données filtrées
        updateReportTable(filteredSales, filteredExpenses, filteredOthers, filteredSupplies, filteredMobileMoney);
        reportTableSection.style.display = 'block'; // Affiche le tableau de rapport
    });

    // Fonction utilitaire pour obtenir la date de début d'une semaine ISO
    function getDateOfISOWeek(w, y) {
        const simple = new Date(y, 0, 1 + (w - 1) * 7);
        const dow = simple.getDay();
        const ISOweekStart = simple;
        if (dow <= 4)
            ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
        else
            ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
        return ISOweekStart;
    }

    // Fonction pour mettre à jour le tableau de rapport
    function updateReportTable(sales, expenses, others, supplies, mobileMoney) {
        reportTable.innerHTML = ''; // Efface le contenu précédent du tableau
        const combinedData = {};  // Objet pour combiner les données par type et désignation

        // Traitement des ventes (Papeterie)
        sales.forEach(sale => {
            const key = `Papeterie-${sale.designation}`;
            if (!combinedData[key]) {
                combinedData[key] = {
                    type: 'Papeterie',
                    designation: sale.designation,
                    quantity: sale.quantity,
                    amount: sale.totalCost
                };
            } else {
                combinedData[key].quantity += sale.quantity;
                combinedData[key].amount += sale.totalCost;
            }
        });

        // Traitement des dépenses
        expenses.forEach(expense => {
            const key = `Dépenses-${expense.reason}`;
            if (!combinedData[key]) {
                combinedData[key] = {
                    type: 'Dépenses',
                    designation: expense.reason,
                    quantity: 0, // Pas de quantité pour les dépenses
                    amount: expense.amount
                };
            } else {
                combinedData[key].amount += expense.amount;
            }
        });

        // Traitement des opérations diverses
        others.forEach(other => {
            const key = `Divers-${other.designation}`;
            if (!combinedData[key]) {
                combinedData[key] = {
                    type: 'Divers',
                    designation: other.designation,
                    quantity: other.quantity,
                    amount: other.totalCost || 0 // Gère les cas où totalCost est null
                };
            } else {
                combinedData[key].quantity += other.quantity;
                combinedData[key].amount += other.totalCost;
            }
        });

        // Traitement des approvisionnements
        supplies.forEach(supply => {
            const key = `Approvisionnement-${supply.designation}`;
            if (!combinedData[key]) {
                combinedData[key] = {
                    type: 'Approvisionnement',
                    designation: supply.designation,
                    quantity: supply.quantity,
                    amount: 0  // Pas de montant direct pour l'approvisionnement (pourrait être calculé)
                };
            } else {
                combinedData[key].quantity += supply.quantity;
            }
        });

        // Traitement de Mobile Money
        mobileMoney.forEach(transaction => {
             const key = `MobileMoney-${transaction.agent}`;
            if (!combinedData[key]) {
                combinedData[key] = {
                    type: `Mobile Money (${transaction.agent})`,
                    designation: `${transaction.agent}`,
                    quantity: 0,
                    amount: transaction.balanceMoov + transaction.balanceMTN + transaction.balanceCelttis + transaction.balanceCash
                };
            } else {
                combinedData[key].amount += transaction.balanceMoov + transaction.balanceMTN + transaction.balanceCelttis + transaction.balanceCash;

            }
        });

        // Ajout des données combinées au tableau
        for (const key in combinedData) {
            const row = reportTable.insertRow();
            const data = combinedData[key];
            row.insertCell().textContent = data.type;
            row.insertCell().textContent = data.designation;
            row.insertCell().textContent = data.quantity;
            row.insertCell().textContent = data.amount.toFixed(2); // Formatage à 2 décimales
        }
    }

    // Gestionnaires d'événements pour l'impression et l'exportation du rapport
    printReportButton.addEventListener('click', function () {
        window.print();
    });

    exportReportExcelButton.addEventListener('click', function () {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.table_to_sheet(document.getElementById('report-table'));
        XLSX.utils.book_append_sheet(wb, ws, "Bilan");
        XLSX.writeFile(wb, "Bilan.xlsx");
    });

    exportReportPdfButton.addEventListener('click', function () {
        window.jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();
        doc.autoTable({ html: '#report-table' });
        doc.save("Bilan.pdf");
    });
    // Ajout des gestionnaires d'événements manquants
    operationTypeSelect.addEventListener('change', handleOperationTypeChange);
    // Initialisation (appelée au chargement de la page)
    initializeData();
});