/**
 * script.js
 * Gère la logique de l'application Gestionnaire de La Charité Modeste.
 */
document.addEventListener('DOMContentLoaded', function () {

    // --- Constantes pour les formulaires et boutons principaux ---
    const salesForm = document.getElementById('sales-form');
    const supplyForm = document.getElementById('supply-form');
    const employeeForm = document.getElementById('employee-form');
    const learnerForm = document.getElementById('learner-form');
    const mobileMoneyForm = document.getElementById('mobile-money-form');
    const creditorForm = document.getElementById('creditor-form');
    const debtForm = document.getElementById('debt-form');

    const showSupplySectionButton = document.getElementById('show-supply-section');
    const showSalesSectionButton = document.getElementById('show-sales-section');
    const showEmployeesSectionButton = document.getElementById('show-employees-section');
    const showLearnersSectionButton = document.getElementById('show-learners-section');
    const showMobileMoneySectionButton = document.getElementById('show-mobile-money-section');
    const showCreditorsSectionButton = document.getElementById('show-creditors-section');
    const showDebtSectionButton = document.getElementById('show-debt-section');
    const showReportSectionButton = document.getElementById('show-report-section');

    const supplySection = document.getElementById('supply-section');
    const salesSection = document.getElementById('sales-section');
    const employeesSection = document.getElementById('employees-section');
    const learnersSection = document.getElementById('learners-section');
    const mobileMoneySection = document.getElementById('mobile-money-section');
    const creditorsSection = document.getElementById('creditors-section');
    const debtSection = document.getElementById('debt-section');
    const reportSection = document.getElementById('report-section');

    // --- Constantes pour les tables (tbody) ---
    const salesTable = document.getElementById('sales-table')?.querySelector('tbody');
    const expensesTable = document.getElementById('expenses-table')?.querySelector('tbody');
    const othersTable = document.getElementById('others-table')?.querySelector('tbody');
    const stockTable = document.getElementById('stock-table')?.querySelector('tbody');
    const supplyTable = document.getElementById('supply-table')?.querySelector('tbody');
    const employeesTable = document.getElementById('employees-table')?.querySelector('tbody');
    const learnersTable = document.getElementById('learners-table')?.querySelector('tbody');
    const mobileMoneyTable = document.getElementById('mobile-money-table')?.querySelector('tbody');
    const creditorsTable = document.getElementById('creditors-table')?.querySelector('tbody');
    const debtTable = document.getElementById('debt-table')?.querySelector('tbody');
    const reportTable = document.getElementById('report-table')?.querySelector('tbody');

    // --- Constantes pour les boutons Afficher/Masquer les détails ---
    const showSupplyListButton = document.getElementById('show-supply-list-button');
    const showStockDetailsButton = document.getElementById('show-stock-details-button');
    const showSalesDetailsButton = document.getElementById('show-sales-details-button');
    const showExpensesDetailsButton = document.getElementById('show-expenses-details-button');
    const showOthersDetailsButton = document.getElementById('show-others-details-button');
    const showEmployeesDetailsButton = document.getElementById('show-employees-details-button');
    const showLearnersDetailsButton = document.getElementById('show-learners-details-button');
    const showMobileMoneyDetailsButton = document.getElementById('show-mobile-money-details-button');
    const showCreditorsDetailsButton = document.getElementById('show-creditors-details-button');
    const showDebtDetailsButton = document.getElementById('show-debt-details-button');
    const showReportDetailsButton = document.getElementById('show-report-details-button');

    // --- Constantes pour les conteneurs de détails ---
    const supplyListContainer = document.getElementById('supply-list-container');
    const stockDetailsContainer = document.getElementById('stock-details-container');
    const salesDetailsContainer = document.getElementById('sales-details-container');
    const expensesDetailsContainer = document.getElementById('expenses-details-container');
    const othersDetailsContainer = document.getElementById('others-details-container');
    const employeesDetailsContainer = document.getElementById('employees-details-container');
    const learnersDetailsContainer = document.getElementById('learners-details-container');
    const mobileMoneyDetailsContainer = document.getElementById('mobile-money-details-container');
    const creditorsDetailsContainer = document.getElementById('creditors-details-container');
    const debtDetailsContainer = document.getElementById('debt-details-container');
    const reportDetailsContainer = document.getElementById('report-details-container');

    // --- Constantes pour les boutons Print ---
    const printStockButton = document.getElementById('print-stock');
    const printSalesButton = document.getElementById('print-sales');
    const printExpensesButton = document.getElementById('print-expenses');
    const printOthersButton = document.getElementById('print-others');
    const printEmployeesButton = document.getElementById('print-employees');
    const printLearnersButton = document.getElementById('print-learners');
    const printMobileMoneyButton = document.getElementById('print-mobile-money');
    const printCreditorsButton = document.getElementById('print-creditors');
    const printDebtButton = document.getElementById('print-debt');
    const printReportButton = document.getElementById('print-report');

    // --- Constantes pour les boutons Export Excel ---
    const exportStockExcelButton = document.getElementById('export-stock-excel');
    const exportSalesExcelButton = document.getElementById('export-sales-excel');
    const exportExpensesExcelButton = document.getElementById('export-expenses-excel');
    const exportOthersExcelButton = document.getElementById('export-others-excel');
    const exportEmployeesExcelButton = document.getElementById('export-employees-excel');
    const exportLearnersExcelButton = document.getElementById('export-learners-excel');
    const exportMobileMoneyExcelButton = document.getElementById('export-mobile-money-excel');
    const exportCreditorsExcelButton = document.getElementById('export-creditors-excel');
    const exportDebtExcelButton = document.getElementById('export-debt-excel');
    const exportReportExcelButton = document.getElementById('export-report-excel');

    // --- Constantes pour les boutons Export PDF ---
    const exportStockPdfButton = document.getElementById('export-stock-pdf');
    const exportSalesPdfButton = document.getElementById('export-sales-pdf');
    const exportExpensesPdfButton = document.getElementById('export-expenses-pdf');
    const exportOthersPdfButton = document.getElementById('export-others-pdf');
    const exportEmployeesPdfButton = document.getElementById('export-employees-pdf');
    const exportLearnersPdfButton = document.getElementById('export-learners-pdf');
    const exportMobileMoneyPdfButton = document.getElementById('export-mobile-money-pdf');
    const exportCreditorsPdfButton = document.getElementById('export-creditors-pdf');
    const exportDebtPdfButton = document.getElementById('export-debt-pdf');
    const exportReportPdfButton = document.getElementById('export-report-pdf');

    // --- Constantes pour le formulaire Approvisionnement ---
    const supplyUnitPriceInput = document.getElementById('supply-unit-price');

    // --- Constantes pour le formulaire Ventes/Divers ---
    const saleDesignationSelect = document.getElementById('sale-designation');
    const saleUnitPriceInput = document.getElementById('sale-unit-price');
    const saleQuantityInput = document.getElementById('sale-quantity');
    const expenseReasonInput = document.getElementById('expense-reason');
    const expenseAmountInput = document.getElementById('expense-amount');
    const otherDesignationInput = document.getElementById('other-designation');
    const otherQuantityInput = document.getElementById('other-quantity');
    const otherUnitPriceInput = document.getElementById('other-unit-price');
    const operationTypeSelect = document.getElementById('operation-type');
    const papeterieDetailsForm = document.getElementById('papeterie-details-form');
    const depensesDetailsForm = document.getElementById('depenses-details-form');
    const diversDetailsForm = document.getElementById('divers-details-form');

    // --- Constantes pour le formulaire Employés ---
    const employeeNomInput = document.getElementById('employee-nom');
    const employeePrenomInput = document.getElementById('employee-prenom');
    const employeeRoleInput = document.getElementById('employee-role');
    const employeeAdresseInput = document.getElementById('employee-adresse');
    const employeeTelephoneInput = document.getElementById('employee-telephone');
    const employeeLieuResidenceInput = document.getElementById('employee-lieu-residence');
    const employeeSalaryInput = document.getElementById('employee-salary');
    const employeeHireDateInput = document.getElementById('employee-hire-date');
    const employeeContactPersonNomInput = document.getElementById('employee-contact-person-nom');
    const employeeContactPersonPrenomInput = document.getElementById('employee-contact-person-prenom');
    const employeeContactPersonAdresseInput = document.getElementById('employee-contact-person-adresse');
    const employeeContactPersonTelephoneInput = document.getElementById('employee-contact-person-telephone');
    const employeeContactPersonLieuResidenceInput = document.getElementById('employee-contact-person-lieu-residence');

    // --- Constantes pour le formulaire Apprenants ---
    const learnerNomInput = document.getElementById('learner-nom');
    const learnerPrenomInput = document.getElementById('learner-prenom');
    const learnerAgeInput = document.getElementById('learner-age');
    const learnerAdresseInput = document.getElementById('learner-adresse');
    const learnerLieuResidenceInput = document.getElementById('learner-lieu-residence');
    const learnerNiveauEtudesInput = document.getElementById('learner-niveau-etudes');
    const learnerSituationMatrimonialeSelect = document.getElementById('learner-situation-matrimoniale');
    const learnerPereNomInput = document.getElementById('learner-pere-nom');
    const learnerPerePrenomInput = document.getElementById('learner-pere-prenom');
    const learnerMereNomInput = document.getElementById('learner-mere-nom');
    const learnerMerePrenomInput = document.getElementById('learner-mere-prenom');
    const learnerFiliereInput = document.getElementById('learner-filiere');
    const learnerDureeFormationInput = document.getElementById('learner-duree-formation');
    const learnerFraisDocumentsInput = document.getElementById('learner-frais-documents');
    const learnerTranche1Input = document.getElementById('learner-tranche1');
    const learnerTranche2Input = document.getElementById('learner-tranche2');
    const learnerTranche3Input = document.getElementById('learner-tranche3');
    const learnerTranche4Input = document.getElementById('learner-tranche4');
    const learnerGarantNomInput = document.getElementById('learner-garant-nom');
    const learnerGarantPrenomInput = document.getElementById('learner-garant-prenom');

    // --- Constantes pour le formulaire Mobile Money ---
    const mmCreditMoovInput = document.getElementById('mm-credit-moov');
    const mmCreditMtnInput = document.getElementById('mm-credit-mtn');
    const mmCreditCelttisInput = document.getElementById('mm-credit-celttis');
    const mmBalanceMoovInput = document.getElementById('mm-balance-moov');
    const mmBalanceMtnInput = document.getElementById('mm-balance-mtn');
    const mmBalanceCelttisInput = document.getElementById('mm-balance-celttis');
    const mmBalanceCashInput = document.getElementById('mm-balance-cash');
    const mmAgentInput = document.getElementById('mm-agent');
    const mmDateInput = document.getElementById('mm-date');

    // --- Constantes pour le formulaire Compte Crédit Client ---
    const amountToPayInput = document.getElementById('amount-to-pay');
    const remainingAmountToPayInput = document.getElementById('remaining-amount-to-pay');
    const creditorDateInput = document.getElementById('creditor-date');
    const creditorNameInput = document.getElementById('creditor-name');
    const creditorDesignationInput = document.getElementById('creditor-designation');
    const creditorDueDateInput = document.getElementById('creditor-due-date');
    const creditorContactInput = document.getElementById('creditor-contact');

    // --- Constantes pour le formulaire Dette/Prêt Entreprise ---
    const debtDateInput = document.getElementById('debt-date');
    const debtTypeSelect = document.getElementById('debt-type');
    const debtNameInput = document.getElementById('debt-name');
    const debtDescriptionInput = document.getElementById('debt-description');
    const debtAmountInput = document.getElementById('debt-amount');
    const debtDueDateInput = document.getElementById('debt-due-date');
    const debtStatusSelect = document.getElementById('debt-status');

    // --- Constantes pour la section Bilans ---
    const dailyReportButton = document.getElementById('daily-report');
    const weeklyReportButton = document.getElementById('weekly-report');
    const monthlyReportButton = document.getElementById('monthly-report');
    const yearlyReportButton = document.getElementById('yearly-report');
    const reportFilters = document.getElementById('report-filters');
    const dailyFilter = document.getElementById('daily-filter');
    const weeklyFilter = document.getElementById('weekly-filter');
    const monthlyFilter = document.getElementById('monthly-filter');
    const yearlyFilter = document.getElementById('yearly-filter');
    const reportDateInput = document.getElementById('report-date');
    const reportWeekInput = document.getElementById('report-week');
    const reportMonthInput = document.getElementById('report-month');
    const reportYearInput = document.getElementById('report-year');
    const generateReportButton = document.getElementById('generate-report');


    // --- Variables pour stocker les données (localStorage) ---
    /**
     * Charge les données depuis localStorage de manière sécurisée.
     * @param {string} key - La clé dans localStorage.
     * @returns {Array} - Les données chargées ou un tableau vide en cas d'erreur/absence.
     */
    const loadData = (key) => {
        try {
            const data = localStorage.getItem(key);
            const parsed = data ? JSON.parse(data) : [];
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) {
            console.error(`Erreur lors du chargement ou parsing des données pour ${key}:`, e);
            localStorage.removeItem(key);
            return [];
        }
    };

    let salesData = loadData('salesData');
    let expensesData = loadData('expensesData');
    let othersData = loadData('othersData');
    let supplyData = loadData('supplyData');
    let employeesData = loadData('employeesData');
    let learnersData = loadData('learnersData');
    let mobileMoneyData = loadData('mobileMoneyData');
    let creditorsData = loadData('creditorsData'); // Crédits Clients
    let debtData = loadData('debtData');           // Dettes/Prêts Entreprise
    let stockData = []; // Toujours recalculé

    // --- Fonctions Utilitaires ---

    /** Met à jour la liste déroulante des désignations de produits. */
    function updateProductDesignations() {
        if (!saleDesignationSelect) return;
        const designations = [...new Set(supplyData.map(item => item.designation).filter(Boolean))].sort();
        saleDesignationSelect.innerHTML = '<option value="">-- Choisir --</option>' +
                                          designations.map(designation => `<option value="${designation}">${designation}</option>`).join('');
    }

    /** Calcule le coût total pour la papeterie. */
    function calculateTotalCost() {
        if (!saleQuantityInput || !saleUnitPriceInput) return;
        const quantity = parseFloat(saleQuantityInput.value) || 0;
        const unitPrice = parseFloat(saleUnitPriceInput.value) || 0;
        const totalCostInput = document.getElementById('sale-total-cost');
        if (totalCostInput) totalCostInput.value = (quantity * unitPrice).toFixed(2);
    }

    /** Calcule le coût total pour les opérations diverses. */
    function calculateOtherTotalCost() {
         if (!otherQuantityInput || !otherUnitPriceInput) return;
        const quantity = parseFloat(otherQuantityInput.value) || 0;
        const unitPrice = parseFloat(otherUnitPriceInput.value) || 0;
        const totalCostInput = document.getElementById('other-total-cost');
        if (totalCostInput) totalCostInput.value = (quantity >= 0 && quantity <= 1 ? unitPrice : quantity * unitPrice).toFixed(2);
    }

    /** Définit la date du jour par défaut pour les champs date vides. */
    function setTodaysDate() {
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');

        [   'sale-date', 'supply-date', 'mm-date',
            'creditor-date', 'creditor-due-date',
            'employee-hire-date',
            'debt-date', 'debt-due-date',
            'report-date'
        ].forEach(id => {
                const element = document.getElementById(id);
                if (element && element.type === 'date' && !element.value) {
                    element.value = today;
                }
            });

        if (reportYearInput && !reportYearInput.value) reportYearInput.value = year;
        if(reportMonthInput && !reportMonthInput.value) reportMonthInput.value = `${year}-${month}`;
        if(reportWeekInput && !reportWeekInput.value){
            try {
                const startOfYear = new Date(Date.UTC(year, 0, 1));
                const todayUTC = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
                const dayOfYear = Math.floor((todayUTC - startOfYear) / 86400000);
                const dayOfWeekISO = startOfYear.getUTCDay() === 0 ? 7 : startOfYear.getUTCDay();
                let weekNumber = Math.ceil((dayOfYear + dayOfWeekISO) / 7);
                if (weekNumber === 0) weekNumber = 1;
                 if (weekNumber >= 52) {
                     const endOfYear = new Date(Date.UTC(year, 11, 31));
                     const endDayOfWeekISO = endOfYear.getUTCDay() === 0 ? 7 : endOfYear.getUTCDay();
                     if (endDayOfWeekISO < 4 && weekNumber > 52) weekNumber = 1;
                 }
                reportWeekInput.value = `${year}-W${weekNumber.toString().padStart(2,'0')}`;
            } catch (dateError) { console.error("Erreur calcul semaine par défaut:", dateError); }
        }
    }

    /** Affiche ou masque un élément. */
    function toggleVisibility(element) {
        if (element) element.style.display = element.style.display === 'none' ? 'block' : 'none';
    }

    /** Gère la visibilité exclusive des sous-sections de détails Ventes/Divers. */
    function toggleSalesSubSectionVisibility(containerToShow) {
        [salesDetailsContainer, expensesDetailsContainer, othersDetailsContainer].forEach(container => {
            if (container) container.style.display = (container === containerToShow && container.style.display === 'none') ? 'block' : 'none';
        });
    }

    /** Affiche une section principale et masque les autres et tous les détails. */
    function setSectionVisibility(sectionToShow, sectionsToHide) {
         if (!sectionToShow) return;
        sectionsToHide.forEach(section => { if(section) section.style.display = 'none'; });
        sectionToShow.style.display = 'block';
        [supplyListContainer, stockDetailsContainer, salesDetailsContainer, expensesDetailsContainer,
         othersDetailsContainer, employeesDetailsContainer, learnersDetailsContainer,
         mobileMoneyDetailsContainer, creditorsDetailsContainer, debtDetailsContainer,
         reportDetailsContainer, reportFilters].forEach(container => { if (container) container.style.display = 'none'; });
        if (showReportDetailsButton) showReportDetailsButton.style.display = 'none';
    }

    /** Gère l'affichage des sous-formulaires dans Ventes/Divers. */
    function handleOperationTypeChange() {
        if (!operationTypeSelect) return;
        const type = operationTypeSelect.value;
        const showPapeterie = (type === 'Papeterie');
        const showDepenses = (type === 'Dépenses');
        const showDivers = (type === 'Divers'); // Simplifié

        if(papeterieDetailsForm) papeterieDetailsForm.style.display = showPapeterie ? 'flex' : 'none';
        if(depensesDetailsForm) depensesDetailsForm.style.display = showDepenses ? 'flex' : 'none';
        if(diversDetailsForm) diversDetailsForm.style.display = showDivers ? 'flex' : 'none';

        // Reset des champs cachés
        if (!showPapeterie) { if (saleDesignationSelect) saleDesignationSelect.selectedIndex = 0; if (saleQuantityInput) saleQuantityInput.value = ''; if (saleUnitPriceInput) saleUnitPriceInput.value = ''; calculateTotalCost(); }
        if (!showDepenses) { if (expenseReasonInput) expenseReasonInput.value = ''; if (expenseAmountInput) expenseAmountInput.value = ''; }
        if (!showDivers) { if (otherDesignationInput) otherDesignationInput.value = ''; if (otherQuantityInput) otherQuantityInput.value = ''; if (otherUnitPriceInput) otherUnitPriceInput.value = ''; calculateOtherTotalCost(); }
    }

    /** Déclenche l'impression. */
    function printTable() { window.print(); }

    /** Exporte une table vers Excel. */
    function exportToExcel(tableId, fileName) {
        try {
            const table = document.getElementById(tableId); if (!table) throw new Error(`Tableau #${tableId} non trouvé`);
            if (typeof XLSX === 'undefined') throw new Error("Librairie XLSX absente");
            const wb = XLSX.utils.book_new(), ws = XLSX.utils.table_to_sheet(table);
            XLSX.utils.book_append_sheet(wb, ws, "Données"); XLSX.writeFile(wb, fileName || "Export.xlsx");
        } catch (error) { console.error("Erreur Excel:", error); alert(`Erreur Excel: ${error.message}`); }
    }

    /** Exporte une table vers PDF. */
    function exportToPdf(tableId, fileName) {
        try {
            const table = document.getElementById(tableId); if (!table) throw new Error(`Tableau #${tableId} non trouvé`);
            if (typeof jspdf === 'undefined' || !jspdf.jsPDF || typeof autoTable === 'undefined') throw new Error("Librairies PDF absentes");
            const { jsPDF } = window.jspdf; const orientation = table.offsetWidth > 800 ? "landscape" : "portrait";
            const doc = new jsPDF({ orientation, unit: "pt", format: "a4" });
            let title = `Export PDF (${tableId})`; const container = table.closest('div[id$="-container"]');
            if (container) { const h3 = container.querySelector('h3'); if (h3) title = h3.innerText; }
            doc.text(title, 40, 40);
            doc.autoTable({ html: '#' + tableId, startY: 60, theme: 'grid', headStyles: { fillColor: [0, 123, 255], textColor: 255 }, styles: { fontSize: orientation === "landscape" ? 7 : 8, cellPadding: 2 }, margin: { top: 60, right: 40, bottom: 40, left: 40 }, tableWidth: 'auto', horizontalPageBreak: true });
            doc.save(fileName || 'Export.pdf');
        } catch (error) { console.error("Erreur PDF:", error); alert(`Erreur PDF: ${error.message}`); }
    }

    /** Calcule le lundi d'une semaine ISO. */
    function getDateOfISOWeek(w, y) {
        if (isNaN(w) || isNaN(y) || w < 1 || w > 53) return new Date(NaN);
        const simpleDate = new Date(Date.UTC(y, 0, 1 + (w - 1) * 7)); const dayOfWeek = simpleDate.getUTCDay();
        const dayOfWeekISO = dayOfWeek === 0 ? 7 : dayOfWeek; const mondayOfWeek = new Date(simpleDate);
        mondayOfWeek.setUTCDate(simpleDate.getUTCDate() - dayOfWeekISO + 1); return mondayOfWeek;
    }

    // --- Fonctions de mise à jour des Tableaux ---

    function updateSalesTable() { if (!salesTable) return; salesTable.innerHTML = ''; salesData.forEach(sale => { const row = salesTable.insertRow(); row.insertCell().textContent = sale.date || '-'; row.insertCell().textContent = sale.designation || '-'; row.insertCell().textContent = sale.quantity || '-'; const priceCell = row.insertCell(); priceCell.textContent = typeof sale.unitPrice === 'number' ? sale.unitPrice.toFixed(2) : '-'; priceCell.style.textAlign = 'right'; const totalCell = row.insertCell(); totalCell.textContent = typeof sale.totalCost === 'number' ? sale.totalCost.toFixed(2) : '-'; totalCell.style.textAlign = 'right'; }); }
    function updateExpensesTable() { if (!expensesTable) return; expensesTable.innerHTML = ''; expensesData.forEach(expense => { const row = expensesTable.insertRow(); row.insertCell().textContent = expense.date || '-'; row.insertCell().textContent = expense.reason || '-'; const amountCell = row.insertCell(); amountCell.textContent = typeof expense.amount === 'number' ? expense.amount.toFixed(2) : '-'; amountCell.style.textAlign = 'right'; }); }
    function updateOthersTable() { if (!othersTable) return; othersTable.innerHTML = ''; othersData.forEach(other => { const row = othersTable.insertRow(); row.insertCell().textContent = other.date || '-'; row.insertCell().textContent = `${other.type ? `[${other.type}] ` : ''}${other.designation || '-'}`; const quantityDisplay = (other.quantity > 0) ? other.quantity : ((typeof other.totalCost === 'number' && other.totalCost > 0) ? 1 : '-'); row.insertCell().textContent = quantityDisplay; const unitPriceDisplay = typeof other.unitPrice === 'number' ? other.unitPrice.toFixed(2) : '-'; const priceCell = row.insertCell(); priceCell.textContent = unitPriceDisplay; priceCell.style.textAlign = 'right'; const totalCostDisplay = typeof other.totalCost === 'number' ? other.totalCost.toFixed(2) : '-'; const totalCell = row.insertCell(); totalCell.textContent = totalCostDisplay; totalCell.style.textAlign = 'right'; }); }
    function updateSupplyTable() { if (!supplyTable) return; supplyTable.innerHTML = ''; supplyData.forEach(supply => { const row = supplyTable.insertRow(); row.insertCell().textContent = supply.date || '-'; row.insertCell().textContent = supply.designation || '-'; row.insertCell().textContent = supply.quantity || '-'; const priceCell = row.insertCell(); priceCell.textContent = typeof supply.unitPrice === 'number' ? supply.unitPrice.toFixed(2) : '-'; priceCell.style.textAlign = 'right'; }); }
    function updateStockTable() { if (!stockTable) return; stockTable.innerHTML = ''; stockData = calculateStock(supplyData, salesData); stockData.forEach(stock => { const row = stockTable.insertRow(); row.insertCell().textContent = stock.date || '-'; row.insertCell().textContent = stock.designation || '-'; row.insertCell().textContent = stock.supplyQuantity || 0; row.insertCell().textContent = stock.soldQuantity || 0; row.insertCell().textContent = stock.remainingQuantity || 0; row.style.backgroundColor = ''; row.style.color = ''; const remaining = stock.remainingQuantity || 0; if (remaining <= 0) { row.style.backgroundColor = '#f8d7da'; row.style.color = '#721c24'; } else if (remaining < 5) { row.style.backgroundColor = '#fff3cd'; row.style.color = '#856404'; } }); }
    function calculateStock(supply, sales) { let stock = {}; supply.forEach(item => { const key = item.designation; if (!key) return; const quantity = parseFloat(item.quantity) || 0; if (quantity <= 0) return; if (!stock[key]) stock[key] = { designation: key, supplyQuantity: 0, soldQuantity: 0, remainingQuantity: 0, date: item.date }; stock[key].supplyQuantity += quantity; stock[key].remainingQuantity += quantity; if (!stock[key].date || (item.date && new Date(item.date) > new Date(stock[key].date))) { stock[key].date = item.date; } }); sales.forEach(item => { const key = item.designation; if (!key) return; const quantity = parseFloat(item.quantity) || 0; if (quantity <= 0) return; if (stock[key]) { stock[key].soldQuantity += quantity; stock[key].remainingQuantity -= quantity; if (!stock[key].date || (item.date && new Date(item.date) > new Date(stock[key].date))) { stock[key].date = item.date; } } else { console.warn(`Stock: Vente pour ${key} sans appro.`); stock[key] = { designation: key, supplyQuantity: 0, soldQuantity: quantity, remainingQuantity: -quantity, date: item.date }; } }); return Object.values(stock).sort((a, b) => a.designation.localeCompare(b.designation)); }
    function updateEmployeesTable() { if (!employeesTable) return; employeesTable.innerHTML = ''; employeesData.forEach(employee => { const row = employeesTable.insertRow(); row.insertCell().textContent = employee.nom || '-'; row.insertCell().textContent = employee.prenom || '-'; row.insertCell().textContent = employee.role || '-'; const salaryCell = row.insertCell(); salaryCell.textContent = typeof employee.salary === 'number' ? employee.salary.toFixed(2) : '-'; salaryCell.style.textAlign = 'right'; row.insertCell().textContent = employee.hireDate || '-'; row.insertCell().textContent = employee.adresse || '-'; row.insertCell().textContent = employee.telephone || '-'; row.insertCell().textContent = employee.lieuResidence || '-'; row.insertCell().textContent = `${employee.contactPersonNom || ''} ${employee.contactPersonPrenom || ''}`.trim() || '-'; row.insertCell().textContent = employee.contactPersonTelephone || '-'; }); }
    function updateLearnersTable() { if (!learnersTable) return; learnersTable.innerHTML = ''; learnersData.forEach(learner => { const row = learnersTable.insertRow(); row.insertCell().textContent = learner.nom || '-'; row.insertCell().textContent = learner.prenom || '-'; row.insertCell().textContent = learner.age || '-'; row.insertCell().textContent = learner.adresse || '-'; row.insertCell().textContent = learner.lieuResidence || '-'; row.insertCell().textContent = learner.niveauEtudes || '-'; row.insertCell().textContent = learner.situationMatrimoniale || '-'; row.insertCell().textContent = `${learner.pereNom || ''} ${learner.perePrenom || ''}`.trim() || '-'; row.insertCell().textContent = `${learner.mereNom || ''} ${learner.merePrenom || ''}`.trim() || '-'; row.insertCell().textContent = learner.filiere || '-'; row.insertCell().textContent = learner.dureeFormation || '-'; let cell = row.insertCell(); cell.textContent = typeof learner.fraisDocuments === 'number' ? learner.fraisDocuments.toFixed(2) : '-'; cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = typeof learner.tranche1 === 'number' ? learner.tranche1.toFixed(2) : '-'; cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = typeof learner.tranche2 === 'number' ? learner.tranche2.toFixed(2) : '-'; cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = typeof learner.tranche3 === 'number' ? learner.tranche3.toFixed(2) : '-'; cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = typeof learner.tranche4 === 'number' ? learner.tranche4.toFixed(2) : '-'; cell.style.textAlign = 'right'; row.insertCell().textContent = `${learner.garantNom || ''} ${learner.garantPrenom || ''}`.trim() || '-'; }); }
    function updateMobileMoneyTable() { if (!mobileMoneyTable) return; mobileMoneyTable.innerHTML = ''; mobileMoneyData.forEach(transaction => { const row = mobileMoneyTable.insertRow(); const balanceMoov = transaction.balanceMoov || 0, balanceMTN = transaction.balanceMTN || 0, balanceCelttis = transaction.balanceCelttis || 0, balanceCash = transaction.balanceCash || 0; const creditMoov = transaction.creditMoov || 0, creditMTN = transaction.creditMTN || 0, creditCelttis = transaction.creditCelttis || 0; const totalBalance = balanceMoov + balanceMTN + balanceCelttis + balanceCash; const totalCredit = creditMoov + creditMTN + creditCelttis; row.insertCell().textContent = transaction.date || '-'; row.insertCell().textContent = transaction.agent || '-'; let cell = row.insertCell(); cell.textContent = balanceMoov.toFixed(2); cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = balanceMTN.toFixed(2); cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = balanceCelttis.toFixed(2); cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = balanceCash.toFixed(2); cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = totalBalance.toFixed(2); cell.style.textAlign = 'right'; cell.style.fontWeight = 'bold'; cell = row.insertCell(); cell.textContent = creditMoov.toFixed(2); cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = creditMTN.toFixed(2); cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = creditCelttis.toFixed(2); cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = totalCredit.toFixed(2); cell.style.textAlign = 'right'; cell.style.fontWeight = 'bold'; }); }
    function updateCreditorsTable() { if (!creditorsTable) return; creditorsTable.innerHTML = ''; const sortedCreditors = [...creditorsData].sort((a, b) => { const aRemaining = typeof a.remainingAmount === 'number' ? a.remainingAmount : (a.totalAmount - (a.amountPaid || 0)); const bRemaining = typeof b.remainingAmount === 'number' ? b.remainingAmount : (b.totalAmount - (b.amountPaid || 0)); const aSolde = (aRemaining <= 0.005); const bSolde = (bRemaining <= 0.005); if (aSolde !== bSolde) return aSolde ? 1 : -1; const nameCompare = (a.name || '').localeCompare(b.name || ''); if (nameCompare !== 0) return nameCompare; return (a.designation || '').localeCompare(b.designation || ''); }); sortedCreditors.forEach(creditor => { const row = creditorsTable.insertRow(); const totalAmount = creditor.totalAmount || 0; const amountPaid = creditor.amountPaid || 0; const remaining = totalAmount - amountPaid; const isSolde = remaining <= 0.005; row.insertCell().textContent = creditor.date || '-'; row.insertCell().textContent = creditor.name || '-'; row.insertCell().textContent = creditor.designation || '-'; let cell = row.insertCell(); cell.textContent = totalAmount.toFixed(2); cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = amountPaid.toFixed(2); cell.style.textAlign = 'right'; cell = row.insertCell(); cell.textContent = remaining.toFixed(2); cell.style.textAlign = 'right'; row.insertCell().textContent = creditor.dueDate || '-'; row.insertCell().textContent = creditor.contact || '-'; row.insertCell().textContent = isSolde ? 'Soldé' : 'En cours'; row.classList.toggle('solde', isSolde); }); }
    function updateDebtTable() { if (!debtTable) return; debtTable.innerHTML = ''; const sortedDebts = [...debtData].sort((a, b) => { const dateA = a.dueDate || a.date; const dateB = b.dueDate || b.date; if (dateA && dateB) { if (dateA < dateB) return -1; if (dateA > dateB) return 1; } else if (dateA) return -1; else if (dateB) return 1; return (a.type || '').localeCompare(b.type || ''); }); sortedDebts.forEach(debt => { const row = debtTable.insertRow(); row.insertCell().textContent = debt.date || '-'; row.insertCell().textContent = debt.type || '-'; row.insertCell().textContent = debt.name || '-'; row.insertCell().textContent = debt.description || '-'; const amountCell = row.insertCell(); amountCell.textContent = typeof debt.amount === 'number' ? debt.amount.toFixed(2) : '-'; amountCell.style.textAlign = 'right'; row.insertCell().textContent = debt.dueDate || '-'; row.insertCell().textContent = debt.status || '-'; row.classList.toggle('solde', debt.status === 'Remboursé / Récupéré'); }); }

    /** Initialise l'application. */
    function initializeData() {
        console.log("Init app...");
        setTodaysDate(); updateProductDesignations();
        updateSalesTable(); updateExpensesTable(); updateOthersTable();
        updateSupplyTable(); updateStockTable(); updateEmployeesTable();
        updateLearnersTable(); updateMobileMoneyTable(); updateCreditorsTable(); updateDebtTable();
        handleOperationTypeChange(); console.log("Init terminée.");
    }

    // --- Gestionnaires d'événements pour la soumission des formulaires ---

    if(salesForm) salesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const dateElement = document.getElementById('sale-date'); if (!dateElement?.value) { alert("Date requise."); return; } const date = dateElement.value;
        const operationType = operationTypeSelect.value; let dataUpdated = false;
        try {
            if (operationType === 'Papeterie') { const designation = saleDesignationSelect.value; if (!designation) throw new Error("Sélectionnez une désignation."); const quantity = parseFloat(saleQuantityInput.value) || 0; if (quantity <= 0) throw new Error("Quantité > 0 requise."); const unitPrice = parseFloat(saleUnitPriceInput.value) || 0; if (unitPrice <= 0) throw new Error("Prix unitaire > 0 requis."); const calculatedTotal = quantity * unitPrice; const sale = { date, designation, quantity, unitPrice, totalCost: calculatedTotal }; const currentStockItem = stockData.find(item => item.designation === sale.designation); const availableStock = currentStockItem ? currentStockItem.remainingQuantity : 0; if (sale.quantity > availableStock) throw new Error(`Stock insuffisant pour ${sale.designation} (Dispo: ${availableStock})`); salesData.push(sale); updateSalesTable(); dataUpdated = true; }
            else if (operationType === 'Dépenses') { const reason = expenseReasonInput.value.trim(); if (!reason) throw new Error("Motif requis."); const amount = parseFloat(expenseAmountInput.value) || 0; if (amount <= 0) throw new Error("Montant > 0 requis."); const expense = { date, reason, amount }; expensesData.push(expense); updateExpensesTable(); dataUpdated = true; }
            else if (operationType === 'Divers') { const designation = otherDesignationInput.value.trim(); if (!designation) throw new Error("Désignation/Motif requis."); const quantity = parseFloat(otherQuantityInput.value) || 0; const unitPriceOrAmount = parseFloat(otherUnitPriceInput.value) || 0; if (unitPriceOrAmount <= 0) throw new Error("Montant/PU > 0 requis."); let calculatedTotalCost = 0, finalQuantity = quantity, finalUnitPrice = unitPriceOrAmount; if (quantity >= 0 && quantity <= 1) { calculatedTotalCost = unitPriceOrAmount; finalQuantity = 1; } else { calculatedTotalCost = quantity * unitPriceOrAmount; } const other = { date, type: operationType, designation, quantity: finalQuantity, unitPrice: finalUnitPrice, totalCost: calculatedTotalCost }; othersData.push(other); updateOthersTable(); dataUpdated = true; }
            else { throw new Error("Type d'opération inconnu."); }
            if (dataUpdated) { localStorage.setItem('salesData', JSON.stringify(salesData)); localStorage.setItem('expensesData', JSON.stringify(expensesData)); localStorage.setItem('othersData', JSON.stringify(othersData)); salesForm.reset(); setTodaysDate(); if(saleDesignationSelect) saleDesignationSelect.selectedIndex = 0; handleOperationTypeChange(); if (operationType === 'Papeterie') updateStockTable(); }
        } catch (error) { alert(`Erreur: ${error.message}`); }
    });

    if(supplyForm) supplyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const dateElement = document.getElementById('supply-date'); const designationElement = document.getElementById('supply-designation'); const quantityElement = document.getElementById('supply-quantity'); const unitPriceElement = supplyUnitPriceInput;
        if (!dateElement || !designationElement || !quantityElement || !unitPriceElement) { alert("Erreur interne Appro."); return; }
        const date = dateElement.value; const designation = designationElement.value.trim(); const quantity = parseFloat(quantityElement.value); const unitPrice = parseFloat(unitPriceElement.value);
        if (!date || !designation || isNaN(quantity) || quantity <= 0 || isNaN(unitPrice) || unitPrice < 0) { alert("Infos Appro invalides (Date, Désignation, Qté>0, PU>=0)."); return; }
        const supply = { date, designation, quantity, unitPrice }; supplyData.push(supply); localStorage.setItem('supplyData', JSON.stringify(supplyData));
        updateSupplyTable(); updateStockTable(); updateProductDesignations(); supplyForm.reset(); setTodaysDate();
    });

    if(employeeForm) employeeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!employeeNomInput) { alert("Erreur interne Employé."); return; } const nom = employeeNomInput.value.trim(); if (!nom) { alert("Nom employé requis."); return; }
        const salaryValue = employeeSalaryInput ? parseFloat(employeeSalaryInput.value) : null;
        const employee = { nom, prenom: employeePrenomInput?.value.trim() || '', role: employeeRoleInput?.value.trim() || '', adresse: employeeAdresseInput?.value.trim() || '', telephone: employeeTelephoneInput?.value.trim() || '', lieuResidence: employeeLieuResidenceInput?.value.trim() || '', salary: !isNaN(salaryValue) ? salaryValue : null, hireDate: employeeHireDateInput?.value || '', contactPersonNom: employeeContactPersonNomInput?.value.trim() || '', contactPersonPrenom: employeeContactPersonPrenomInput?.value.trim() || '', contactPersonAdresse: employeeContactPersonAdresseInput?.value.trim() || '', contactPersonTelephone: employeeContactPersonTelephoneInput?.value.trim() || '', contactPersonLieuResidence: employeeContactPersonLieuResidenceInput?.value.trim() || '' };
        employeesData.push(employee); localStorage.setItem('employeesData', JSON.stringify(employeesData)); updateEmployeesTable(); employeeForm.reset(); setTodaysDate();
    });

    if(learnerForm) learnerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!learnerNomInput || !learnerFiliereInput) { alert("Erreur interne Apprenant."); return; } const nom = learnerNomInput.value.trim(); const filiere = learnerFiliereInput.value.trim(); if (!nom || !filiere) { alert("Nom et filière requis."); return; } const ageValue = learnerAgeInput ? parseInt(learnerAgeInput.value) : null; const fraisDocsValue = learnerFraisDocumentsInput ? parseFloat(learnerFraisDocumentsInput.value) : 0; const tranche1Value = learnerTranche1Input ? parseFloat(learnerTranche1Input.value) : 0; const learner = { nom, prenom: learnerPrenomInput?.value.trim() || '', age: !isNaN(ageValue) ? ageValue : null, adresse: learnerAdresseInput?.value.trim() || '', lieuResidence: learnerLieuResidenceInput?.value.trim() || '', niveauEtudes: learnerNiveauEtudesInput?.value.trim() || '', situationMatrimoniale: learnerSituationMatrimonialeSelect?.value || '', pereNom: learnerPereNomInput?.value.trim() || '', perePrenom: learnerPerePrenomInput?.value.trim() || '', mereNom: learnerMereNomInput?.value.trim() || '', merePrenom: learnerMerePrenomInput?.value.trim() || '', filiere, dureeFormation: learnerDureeFormationInput?.value.trim() || '', fraisDocuments: !isNaN(fraisDocsValue) ? fraisDocsValue : 0, tranche1: !isNaN(tranche1Value) ? tranche1Value : 0, tranche2: parseFloat(learnerTranche2Input?.value) || 0, tranche3: parseFloat(learnerTranche3Input?.value) || 0, tranche4: parseFloat(learnerTranche4Input?.value) || 0, garantNom: learnerGarantNomInput?.value.trim() || '', garantPrenom: learnerGarantPrenomInput?.value.trim() || '' };
        learnersData.push(learner); localStorage.setItem('learnersData', JSON.stringify(learnersData)); updateLearnersTable(); learnerForm.reset();
    });

    if(mobileMoneyForm) mobileMoneyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!mmDateInput || !mmAgentInput) { alert("Erreur interne MM."); return; } const date = mmDateInput.value; const agent = mmAgentInput.value.trim(); if (!date || !agent) { alert("Date et Agent requis (MM)."); return; }
        const transaction = { date, agent, balanceMoov: parseFloat(mmBalanceMoovInput?.value) || 0, balanceMTN: parseFloat(mmBalanceMtnInput?.value) || 0, balanceCelttis: parseFloat(mmBalanceCelttisInput?.value) || 0, balanceCash: parseFloat(mmBalanceCashInput?.value) || 0, creditMoov: parseFloat(mmCreditMoovInput?.value) || 0, creditMTN: parseFloat(mmCreditMtnInput?.value) || 0, creditCelttis: parseFloat(mmCreditCelttisInput?.value) || 0 };
        mobileMoneyData.push(transaction); localStorage.setItem('mobileMoneyData', JSON.stringify(mobileMoneyData)); updateMobileMoneyTable(); mobileMoneyForm.reset(); setTodaysDate();
    });

    if(creditorForm) creditorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!creditorDateInput || !creditorNameInput || !creditorDesignationInput || !amountToPayInput || !remainingAmountToPayInput) { alert("Erreur interne Crédit Client."); return; }
        const date = creditorDateInput.value; const name = creditorNameInput.value.trim(); const designation = creditorDesignationInput.value.trim(); const amountPaidNow = parseFloat(amountToPayInput.value) || 0; const totalAmountDue = parseFloat(remainingAmountToPayInput.value) || 0; const contact = creditorContactInput?.value.trim() || ''; const dueDate = creditorDueDateInput?.value || '';
        if (!date || !name || !designation || isNaN(totalAmountDue) || totalAmountDue <= 0) { alert("Infos Crédit Client invalides."); return; } if (isNaN(amountPaidNow) || amountPaidNow < 0) { alert("Montant payé invalide."); return; }
        const existingCreditorIndex = creditorsData.findIndex(c => c.name === name && c.designation === designation && ( (typeof c.remainingAmount === 'number' && c.remainingAmount > 0.005) || (typeof c.remainingAmount !== 'number' && (c.totalAmount - (c.amountPaid || 0)) > 0.005 ) ) );
        try {
            if (existingCreditorIndex > -1) { const existingCreditor = creditorsData[existingCreditorIndex]; const originalTotalAmount = existingCreditor.totalAmount || 0; const currentAmountPaid = existingCreditor.amountPaid || 0; const currentRemaining = originalTotalAmount - currentAmountPaid; if (amountPaidNow > currentRemaining + 0.005) throw new Error(`Paiement > Restant`); existingCreditor.amountPaid = currentAmountPaid + amountPaidNow; existingCreditor.remainingAmount = originalTotalAmount - existingCreditor.amountPaid; if (Math.abs(existingCreditor.remainingAmount) < 0.005) existingCreditor.remainingAmount = 0; if (dueDate) existingCreditor.dueDate = dueDate; if (contact) existingCreditor.contact = contact; existingCreditor.date = date; }
            else { if (amountPaidNow > totalAmountDue) throw new Error(`Paiement initial > Total Dû`); const newCreditor = { date, name, designation, totalAmount: totalAmountDue, amountPaid: amountPaidNow, remainingAmount: totalAmountDue - amountPaidNow, dueDate: dueDate || null, contact: contact || null }; if (Math.abs(newCreditor.remainingAmount) < 0.005) newCreditor.remainingAmount = 0; creditorsData.push(newCreditor); }
            localStorage.setItem('creditorsData', JSON.stringify(creditorsData)); updateCreditorsTable(); creditorForm.reset(); setTodaysDate();
        } catch (error) { alert(`Erreur Crédit Client : ${error.message}`); }
    });

     if(debtForm) debtForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!debtDateInput || !debtTypeSelect || !debtNameInput || !debtDescriptionInput || !debtAmountInput || !debtStatusSelect) { alert("Erreur interne Dette/Prêt."); return; }
        const date = debtDateInput.value; const type = debtTypeSelect.value; const name = debtNameInput.value.trim(); const description = debtDescriptionInput.value.trim(); const amount = parseFloat(debtAmountInput.value); const dueDate = debtDueDateInput?.value || ''; const status = debtStatusSelect.value;
        if (!date || !type || !name || !description || isNaN(amount) || amount <= 0 || !status) { alert("Infos Dette/Prêt invalides."); return; }
        const newDebt = { date, type, name, description, amount, dueDate, status };
        debtData.push(newDebt); localStorage.setItem('debtData', JSON.stringify(debtData));
        updateDebtTable(); debtForm.reset(); setTodaysDate();
    });

    // --- Gestionnaires d'événements pour afficher/masquer les détails ---
    const addToggleListener = (button, container) => { if(button) button.addEventListener('click', () => toggleVisibility(container)); };
    addToggleListener(showSupplyListButton, supplyListContainer); addToggleListener(showStockDetailsButton, stockDetailsContainer);
    if(showSalesDetailsButton) showSalesDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(salesDetailsContainer)); if(showExpensesDetailsButton) showExpensesDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(expensesDetailsContainer)); if(showOthersDetailsButton) showOthersDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(othersDetailsContainer));
    addToggleListener(showEmployeesDetailsButton, employeesDetailsContainer); addToggleListener(showLearnersDetailsButton, learnersDetailsContainer);
    addToggleListener(showMobileMoneyDetailsButton, mobileMoneyDetailsContainer); addToggleListener(showCreditorsDetailsButton, creditorsDetailsContainer);
    addToggleListener(showDebtDetailsButton, debtDetailsContainer); addToggleListener(showReportDetailsButton, reportDetailsContainer);

    // --- Gestionnaires d'événements pour la visibilité des sections principales ---
    const allSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection].filter(Boolean);
    const addSectionToggleListener = (button, sectionToShow) => { if (button) button.addEventListener('click', () => setSectionVisibility(sectionToShow, allSections.filter(s => s !== sectionToShow))); };
    addSectionToggleListener(showSupplySectionButton, supplySection); addSectionToggleListener(showSalesSectionButton, salesSection);
    addSectionToggleListener(showEmployeesSectionButton, employeesSection); addSectionToggleListener(showLearnersSectionButton, learnersSection);
    addSectionToggleListener(showMobileMoneySectionButton, mobileMoneySection); addSectionToggleListener(showCreditorsSectionButton, creditorsSection);
    addSectionToggleListener(showDebtSectionButton, debtSection);
    if(showReportSectionButton) showReportSectionButton.addEventListener('click', () => { setSectionVisibility(reportSection, allSections.filter(s => s !== reportSection)); if (reportFilters) reportFilters.style.display = 'none'; });

    // --- Gestionnaires pour les calculs automatiques ---
    if(saleQuantityInput) saleQuantityInput.addEventListener('input', calculateTotalCost); if(saleUnitPriceInput) saleUnitPriceInput.addEventListener('input', calculateTotalCost);
    if(otherQuantityInput) otherQuantityInput.addEventListener('input', calculateOtherTotalCost); if(otherUnitPriceInput) otherUnitPriceInput.addEventListener('input', calculateOtherTotalCost);
    if(operationTypeSelect) operationTypeSelect.addEventListener('change', handleOperationTypeChange);

    // --- Gestionnaires d'événements pour Impression ---
    const addPrintListener = (button) => { if (button) button.addEventListener('click', printTable); };
    [ printStockButton, printSalesButton, printExpensesButton, printOthersButton, printEmployeesButton, printLearnersButton, printMobileMoneyButton, printCreditorsButton, printDebtButton, printReportButton ].forEach(addPrintListener);

    // --- Gestionnaires d'événements pour Export Excel ---
    const addExcelListener = (button, tableId, fileName) => { if (button) button.addEventListener('click', () => exportToExcel(tableId, fileName)); };
    addExcelListener(exportStockExcelButton, 'stock-table', 'Stocks.xlsx'); addExcelListener(exportSalesExcelButton, 'sales-table', 'Papeterie.xlsx'); addExcelListener(exportExpensesExcelButton, 'expenses-table', 'Depenses.xlsx'); addExcelListener(exportOthersExcelButton, 'others-table', 'Divers.xlsx'); addExcelListener(exportEmployeesExcelButton, 'employees-table', 'Employes.xlsx'); addExcelListener(exportLearnersExcelButton, 'learners-table', 'Apprenants.xlsx'); addExcelListener(exportMobileMoneyExcelButton, 'mobile-money-table', 'MobileMoney.xlsx'); addExcelListener(exportCreditorsExcelButton, 'creditors-table', 'Credits_Clients.xlsx'); addExcelListener(exportDebtExcelButton, 'debt-table', 'Dettes_Prets_Entreprise.xlsx'); addExcelListener(exportReportExcelButton, 'report-table', 'Bilan.xlsx');

    // --- Gestionnaires d'événements pour Export PDF ---
    const addPdfListener = (button, tableId, fileName) => { if (button) button.addEventListener('click', () => exportToPdf(tableId, fileName)); };
    addPdfListener(exportStockPdfButton, 'stock-table', 'Stocks.pdf'); addPdfListener(exportSalesPdfButton, 'sales-table', 'Papeterie.pdf'); addPdfListener(exportExpensesPdfButton, 'expenses-table', 'Depenses.pdf'); addPdfListener(exportOthersPdfButton, 'others-table', 'Divers.pdf'); addPdfListener(exportEmployeesPdfButton, 'employees-table', 'Employes.pdf'); addPdfListener(exportLearnersPdfButton, 'learners-table', 'Apprenants.pdf'); addPdfListener(exportMobileMoneyPdfButton, 'mobile-money-table', 'MobileMoney.pdf'); addPdfListener(exportCreditorsPdfButton, 'creditors-table', 'Credits_Clients.pdf'); addPdfListener(exportDebtPdfButton, 'debt-table', 'Dettes_Prets_Entreprise.pdf'); addPdfListener(exportReportPdfButton, 'report-table', 'Bilan.pdf');

    // --- Gestionnaires d'événements pour les Rapports (Bilans) ---
     const showReportFilters = (showDaily, showWeekly, showMonthly, showYearly) => { if (reportFilters) reportFilters.style.display = 'block'; if (dailyFilter) dailyFilter.style.display = showDaily ? 'flex' : 'none'; if (weeklyFilter) weeklyFilter.style.display = showWeekly ? 'flex' : 'none'; if (monthlyFilter) monthlyFilter.style.display = showMonthly ? 'flex' : 'none'; if (yearlyFilter) yearlyFilter.style.display = showYearly ? 'flex' : 'none'; if (reportDetailsContainer) reportDetailsContainer.style.display = 'none'; if (showReportDetailsButton) showReportDetailsButton.style.display = 'none'; };
    if(dailyReportButton) dailyReportButton.addEventListener('click', () => showReportFilters(true, false, false, false)); if(weeklyReportButton) weeklyReportButton.addEventListener('click', () => showReportFilters(false, true, false, false)); if(monthlyReportButton) monthlyReportButton.addEventListener('click', () => showReportFilters(false, false, true, false)); if(yearlyReportButton) yearlyReportButton.addEventListener('click', () => showReportFilters(false, false, false, true));

    if(generateReportButton) generateReportButton.addEventListener('click', function () {
        let selectedDate = null, selectedWeek = null, selectedMonth = null, selectedYear = null, filterType = '', filterLabel = '';
        if (dailyFilter?.style.display === 'flex') { selectedDate = reportDateInput?.value; filterType = 'day'; filterLabel = selectedDate ? `Jour: ${selectedDate}` : 'Journalier'; } else if (weeklyFilter?.style.display === 'flex') { selectedWeek = reportWeekInput?.value; filterType = 'week'; filterLabel = selectedWeek ? `Semaine: ${selectedWeek}` : 'Hebdomadaire'; } else if (monthlyFilter?.style.display === 'flex') { selectedMonth = reportMonthInput?.value; filterType = 'month'; filterLabel = selectedMonth ? `Mois: ${selectedMonth}` : 'Mensuel'; } else if (yearlyFilter?.style.display === 'flex') { selectedYear = reportYearInput?.value; filterType = 'year'; filterLabel = selectedYear ? `Année: ${selectedYear}` : 'Annuel'; } else { alert("Choisissez un type de bilan."); return; }
        if ((filterType === 'day' && !selectedDate) || (filterType === 'week' && !selectedWeek) || (filterType === 'month' && !selectedMonth) || (filterType === 'year' && !selectedYear)) { alert("Spécifiez la période."); return; }
        const filterData = (data) => { if (!Array.isArray(data)) return []; return data.filter(item => { if (!item?.date) return false; const itemDateStr = item.date; try { const itemDate = new Date(itemDateStr + 'T00:00:00Z'); if (isNaN(itemDate.getTime())) return false; switch (filterType) { case 'day': return itemDateStr === selectedDate; case 'week': if (!selectedWeek?.includes('-W')) return false; const [yW, wW] = selectedWeek.split('-W').map(Number); if (isNaN(yW) || isNaN(wW)) return false; const startW = getDateOfISOWeek(wW, yW); if (isNaN(startW.getTime())) return false; const endW = new Date(startW); endW.setUTCDate(startW.getUTCDate() + 6); return itemDate >= startW && itemDate <= endW; case 'month': if (!selectedMonth || selectedMonth.length !== 7) return false; return itemDateStr.substring(0, 7) === selectedMonth; case 'year': if (!selectedYear) return false; return itemDateStr.substring(0, 4) === selectedYear.toString(); default: return false; } } catch (e) { console.error("Err date filtre:", itemDateStr, e); return false; } }); };
        const filteredSales = filterData(salesData), filteredExpenses = filterData(expensesData), filteredOthers = filterData(othersData), filteredSupplies = filterData(supplyData), filteredMobileMoney = filterData(mobileMoneyData);
        updateReportTable(filteredSales, filteredExpenses, filteredOthers, filteredSupplies, filteredMobileMoney, filterLabel);
        if (reportDetailsContainer) reportDetailsContainer.style.display = 'block'; if (showReportDetailsButton) showReportDetailsButton.style.display = 'inline-block';
    });

    /** Met à jour la table HTML du bilan. */
    function updateReportTable(sales, expenses, others, supplies, mobileMoney, filterLabel) {
         if (!reportTable) return;
         const reportTitleElement = reportDetailsContainer?.querySelector('h3'); if (reportTitleElement) reportTitleElement.textContent = `Bilan Généré (${filterLabel || 'Période'})`;
        reportTable.innerHTML = '';
        let totalSalesAmount = sales.reduce((s, i) => s + (i.totalCost || 0), 0), totalSalesQuantity = sales.reduce((s, i) => s + (i.quantity || 0), 0);
        let totalExpensesAmount = expenses.reduce((s, i) => s + (i.amount || 0), 0);
        let totalOthersIn = 0, totalOthersOut = 0, othersInCount = 0, othersOutCount = 0; others.forEach(o => { const a = o.totalCost || o.amount || 0; if (a >= 0) { totalOthersIn += a; othersInCount++; } else { totalOthersOut += Math.abs(a); othersOutCount++; } });
        const totalRevenu = totalSalesAmount + totalOthersIn, totalDepenses = totalExpensesAmount + totalOthersOut, netResult = totalRevenu - totalDepenses;
        let totalSuppliesQuantity = supplies.reduce((s, i) => s + (i.quantity || 0), 0), totalSuppliesCost = supplies.reduce((s, i) => s + ((i.quantity || 0) * (i.unitPrice || 0)), 0);
        let totalMobileMoneyEndBalance = 0, lastMMDate = '', totalMobileMoneyCredit = 0;
        if (mobileMoney.length > 0) { const sortedMM = [...mobileMoney].sort((a, b) => new Date(b.date) - new Date(a.date)); const lastMMEntry = sortedMM[0]; totalMobileMoneyEndBalance = (lastMMEntry.balanceMoov || 0) + (lastMMEntry.balanceMTN || 0) + (lastMMEntry.balanceCelttis || 0) + (lastMMEntry.balanceCash || 0); totalMobileMoneyCredit = (lastMMEntry.creditMoov || 0) + (lastMMEntry.creditMTN || 0) + (lastMMEntry.creditCelttis || 0); lastMMDate = lastMMEntry.date; }
        const addRow = (type, detail, quantity, amount, style = {}) => { const r = reportTable.insertRow(), c1 = r.insertCell(), c2 = r.insertCell(), c3 = r.insertCell(), c4 = r.insertCell(); c1.textContent = type; c2.textContent = detail; c3.textContent = quantity; c4.textContent = typeof amount === 'number' ? amount.toFixed(2) : amount; c4.style.textAlign = 'right'; c3.style.textAlign = 'center'; Object.assign(r.style, style); };
        addRow('Ventes (Papeterie)', `Total ${sales.length} ventes`, totalSalesQuantity, totalSalesAmount, { backgroundColor: '#eaffea' }); addRow('Autres Opérations (Entrées)', `Total ${othersInCount} op.`, '-', totalOthersIn, { backgroundColor: '#eaffea' }); addRow('TOTAL REVENUS', '', '', totalRevenu, { fontWeight: 'bold', borderTop: '1px solid #ccc' });
        addRow('', '', '', '', {}); addRow('Dépenses', `Total ${expenses.length} dépenses`, '-', totalExpensesAmount, { backgroundColor: '#ffeaea' }); if (totalOthersOut > 0) addRow('Autres Opérations (Sorties)', `Total ${othersOutCount} op.`, '-', totalOthersOut, { backgroundColor: '#ffeaea' }); addRow('TOTAL DÉPENSES', '', '', totalDepenses, { fontWeight: 'bold', color: 'red', borderTop: '1px solid #ccc' });
        addRow('', '', '', '', { border: 'none' }); const resultRow = reportTable.insertRow(); resultRow.style.fontWeight = 'bold'; resultRow.style.borderTop = '2px solid black'; resultRow.insertCell().textContent = 'Résultat Net (Revenus - Dépenses)'; resultRow.insertCell().textContent = ''; resultRow.insertCell().textContent = ''; const netCell = resultRow.insertCell(); netCell.textContent = netResult.toFixed(2); netCell.style.textAlign = 'right'; resultRow.style.backgroundColor = netResult >= 0 ? '#d4edda' : '#f8d7da';
        addRow('', '', '', '', {}); const infoStyle = { fontStyle: 'italic', color: '#555' }; if (totalSuppliesCost > 0) addRow('Info: Coût Appro.', `Total ${supplies.length} appro.`, totalSuppliesQuantity, totalSuppliesCost, infoStyle); if (lastMMDate) { addRow('Info: Solde MM', `Total au ${lastMMDate}`, '-', totalMobileMoneyEndBalance, infoStyle); if (totalMobileMoneyCredit > 0) addRow('Info: Crédit MM', `Total au ${lastMMDate}`, '-', totalMobileMoneyCredit, { ...infoStyle, color: '#cc8400' }); }
    }

    // --- Initialisation ---
    initializeData();

});