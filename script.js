document.addEventListener('DOMContentLoaded', function () {

    // --- Constantes pour les formulaires et boutons principaux ---
    const supplyForm = document.getElementById('supply-form');
    const salesForm = document.getElementById('sales-form');
    const employeeForm = document.getElementById('employee-form');
    const learnerForm = document.getElementById('learner-form');
    const mobileMoneyForm = document.getElementById('mobile-money-form');
    const mmFournisseurForm = document.getElementById('mm-fournisseur-form');
    const clientProfileForm = document.getElementById('client-profile-form');
    const creditorForm = document.getElementById('creditor-form');
    const debtForm = document.getElementById('debt-form');
    const permissionEmployeeForm = document.getElementById('permission-employee-form'); // Added
    const permissionLearnerForm = document.getElementById('permission-learner-form'); // Added
    const invoiceGeneratorForm = document.getElementById('invoice-generator-form'); // Added


    // Buttons
    const showSupplySectionButton = document.getElementById('show-supply-section');
    const showSalesSectionButton = document.getElementById('show-sales-section');
    const showEmployeesSectionButton = document.getElementById('show-employees-section');
    const showLearnersSectionButton = document.getElementById('show-learners-section');
    const showMobileMoneySectionButton = document.getElementById('show-mobile-money-section');
    const showCreditorsSectionButton = document.getElementById('show-creditors-section');
    const showDebtSectionButton = document.getElementById('show-debt-section');
    const showReportSectionButton = document.getElementById('show-report-section');
    const generateInvoiceButton = document.getElementById('generate-invoice-button'); // Added

    // Sections
    const supplySection = document.getElementById('supply-section');
    const salesSection = document.getElementById('sales-section');
    const employeesSection = document.getElementById('employees-section');
    const learnersSection = document.getElementById('learners-section');
    const mobileMoneySection = document.getElementById('mobile-money-section');
    const creditorsSection = document.getElementById('creditors-section');
    const debtSection = document.getElementById('debt-section');
    const reportSection = document.getElementById('report-section');
    const invoiceGeneratorSection = document.getElementById('invoice-generator-section'); // Added


    // --- Constantes pour les tables (tbody) ---
    const salesTable = document.getElementById('sales-table')?.querySelector('tbody');
    const materielElectriqueTable = document.getElementById('materiel-electrique-table')?.querySelector('tbody');
    const expensesTable = document.getElementById('expenses-table')?.querySelector('tbody');
    const othersTable = document.getElementById('others-table')?.querySelector('tbody');
    const stockTable = document.getElementById('stock-table')?.querySelector('tbody');
    const supplyTable = document.getElementById('supply-table')?.querySelector('tbody');
    const employeesTable = document.getElementById('employees-table')?.querySelector('tbody');
    const learnersTable = document.getElementById('learners-table')?.querySelector('tbody');
    const mobileMoneyTable = document.getElementById('mobile-money-table')?.querySelector('tbody');
    const mmFournisseursTable = document.getElementById('mm-fournisseurs-table')?.querySelector('tbody');
    const clientProfilesTable = document.getElementById('client-profiles-table')?.querySelector('tbody');
    const creditorsTable = document.getElementById('creditors-table')?.querySelector('tbody');
    const debtTable = document.getElementById('debt-table')?.querySelector('tbody');
    const reportTable = document.getElementById('report-table')?.querySelector('tbody');
    const employeePermissionsTable = document.getElementById('employee-permissions-table')?.querySelector('tbody'); // Added
    const learnerPermissionsTable = document.getElementById('learner-permissions-table')?.querySelector('tbody'); // Added


    // --- Constantes pour les boutons Afficher/Masquer les détails ---
    const showSupplyListButton = document.getElementById('show-supply-list-button');
    const showStockDetailsButton = document.getElementById('show-stock-details-button');
    const showSalesDetailsButton = document.getElementById('show-sales-details-button');
    const showMaterielElectriqueDetailsButton = document.getElementById('show-materiel-electrique-details-button');
    const showExpensesDetailsButton = document.getElementById('show-expenses-details-button');
    const showOthersDetailsButton = document.getElementById('show-others-details-button');
    const showEmployeesDetailsButton = document.getElementById('show-employees-details-button');
    const showLearnersDetailsButton = document.getElementById('show-learners-details-button');
    const showMobileMoneyDetailsButton = document.getElementById('show-mobile-money-details-button');
    const showMmFournisseursDetailsButton = document.getElementById('show-mm-fournisseurs-details-button');
    const showClientProfilesButton = document.getElementById('show-client-profiles-button');
    const showCreditorsDetailsButton = document.getElementById('show-creditors-details-button');
    const showDebtDetailsButton = document.getElementById('show-debt-details-button');
    const showReportDetailsButton = document.getElementById('show-report-details-button');
    const showEmployeePermissionsButton = document.getElementById('show-employee-permissions-button'); // Added
    const showLearnerPermissionsButton = document.getElementById('show-learner-permissions-button'); // Added


    // --- Constantes pour les conteneurs de détails ---
    const supplyListContainer = document.getElementById('supply-list-container');
    const stockDetailsContainer = document.getElementById('stock-details-container');
    const salesDetailsContainer = document.getElementById('sales-details-container');
    const materielElectriqueDetailsContainer = document.getElementById('materiel-electrique-details-container');
    const expensesDetailsContainer = document.getElementById('expenses-details-container');
    const othersDetailsContainer = document.getElementById('others-details-container');
    const employeesDetailsContainer = document.getElementById('employees-details-container');
    const learnersDetailsContainer = document.getElementById('learners-details-container');
    const mobileMoneyDetailsContainer = document.getElementById('mobile-money-details-container');
    const mmFournisseursDetailsContainer = document.getElementById('mm-fournisseurs-details-container');
    const clientProfilesContainer = document.getElementById('client-profiles-container');
    const creditorsDetailsContainer = document.getElementById('creditors-details-container');
    const debtDetailsContainer = document.getElementById('debt-details-container');
    const reportDetailsContainer = document.getElementById('report-details-container');
    const employeePermissionsContainer = document.getElementById('employee-permissions-container'); // Added
    const learnerPermissionsContainer = document.getElementById('learner-permissions-container'); // Added


    // --- Constantes pour les boutons Print/Export ---
    const printSupplyButton = document.getElementById('print-supply');
    const printStockButton = document.getElementById('print-stock');
    const printSalesButton = document.getElementById('print-sales');
    const printMaterielElectriqueButton = document.getElementById('print-materiel-electrique');
    const printExpensesButton = document.getElementById('print-expenses');
    const printOthersButton = document.getElementById('print-others');
    const printEmployeesButton = document.getElementById('print-employees');
    const printLearnersButton = document.getElementById('print-learners');
    const printMobileMoneyButton = document.getElementById('print-mobile-money');
    const printMmFournisseursButton = document.getElementById('print-mm-fournisseurs');
    const printClientProfilesButton = document.getElementById('print-client-profiles');
    const printCreditorsButton = document.getElementById('print-creditors');
    const printDebtButton = document.getElementById('print-debt');
    const printReportButton = document.getElementById('print-report');
    const printEmployeePermissionsButton = document.getElementById('print-employee-permissions'); // Added
    const printLearnerPermissionsButton = document.getElementById('print-learner-permissions'); // Added

    const exportSupplyExcelButton = document.getElementById('export-supply-excel');
    const exportStockExcelButton = document.getElementById('export-stock-excel');
    const exportSalesExcelButton = document.getElementById('export-sales-excel');
    const exportMaterielElectriqueExcelButton = document.getElementById('export-materiel-electrique-excel');
    const exportExpensesExcelButton = document.getElementById('export-expenses-excel');
    const exportOthersExcelButton = document.getElementById('export-others-excel');
    const exportEmployeesExcelButton = document.getElementById('export-employees-excel');
    const exportLearnersExcelButton = document.getElementById('export-learners-excel');
    const exportMobileMoneyExcelButton = document.getElementById('export-mobile-money-excel');
    const exportMmFournisseursExcelButton = document.getElementById('export-mm-fournisseurs-excel');
    const exportClientProfilesExcelButton = document.getElementById('export-client-profiles-excel');
    const exportCreditorsExcelButton = document.getElementById('export-creditors-excel');
    const exportDebtExcelButton = document.getElementById('export-debt-excel');
    const exportReportExcelButton = document.getElementById('export-report-excel');
    const exportEmployeePermissionsExcelButton = document.getElementById('export-employee-permissions-excel'); // Added
    const exportLearnerPermissionsExcelButton = document.getElementById('export-learner-permissions-excel'); // Added

    const exportSupplyPdfButton = document.getElementById('export-supply-pdf');
    const exportStockPdfButton = document.getElementById('export-stock-pdf');
    const exportSalesPdfButton = document.getElementById('export-sales-pdf');
    const exportMaterielElectriquePdfButton = document.getElementById('export-materiel-electrique-pdf');
    const exportExpensesPdfButton = document.getElementById('export-expenses-pdf');
    const exportOthersPdfButton = document.getElementById('export-others-pdf');
    const exportEmployeesPdfButton = document.getElementById('export-employees-pdf');
    const exportLearnersPdfButton = document.getElementById('export-learners-pdf');
    const exportMobileMoneyPdfButton = document.getElementById('export-mobile-money-pdf');
    const exportMmFournisseursPdfButton = document.getElementById('export-mm-fournisseurs-pdf');
    const exportClientProfilesPdfButton = document.getElementById('export-client-profiles-pdf');
    const exportCreditorsPdfButton = document.getElementById('export-creditors-pdf');
    const exportDebtPdfButton = document.getElementById('export-debt-pdf');
    const exportReportPdfButton = document.getElementById('export-report-pdf');
    const exportEmployeePermissionsPdfButton = document.getElementById('export-employee-permissions-pdf'); // Added
    const exportLearnerPermissionsPdfButton = document.getElementById('export-learner-permissions-pdf'); // Added


    // --- Constantes pour les champs de formulaire ---
    // Supply
    const supplyDateInput = document.getElementById('supply-date');
    const supplyTypeSelect = document.getElementById('supply-type');
    const supplyDesignationInput = document.getElementById('supply-designation');
    const supplyQuantityInput = document.getElementById('supply-quantity');
    const supplyUnitPriceInput = document.getElementById('supply-unit-price');
    const supplyTotalAmountInput = document.getElementById('supply-total-amount');
    // Sales/Divers
    const operationTypeSelect = document.getElementById('operation-type');
    const saleDateInput = document.getElementById('sale-date');
    const papeterieDetailsForm = document.getElementById('papeterie-details-form');
    const saleDesignationSelect = document.getElementById('sale-designation');
    const saleQuantityInput = document.getElementById('sale-quantity');
    const saleUnitPriceInput = document.getElementById('sale-unit-price');
    const saleTotalAmountInput = document.getElementById('sale-total-amount');
    const materielElectriqueDetailsForm = document.getElementById('materiel-electrique-details-form');
    const meDesignationSelect = document.getElementById('me-designation');
    const meQuantityInput = document.getElementById('me-quantity');
    const meUnitPriceInput = document.getElementById('me-unit-price');
    const meTotalAmountInput = document.getElementById('me-total-amount');
    const depensesDetailsForm = document.getElementById('depenses-details-form');
    const expenseReasonInput = document.getElementById('expense-reason');
    const expenseAmountInput = document.getElementById('expense-amount');
    const diversDetailsForm = document.getElementById('divers-details-form');
    const otherDesignationInput = document.getElementById('other-designation');
    const otherQuantityInput = document.getElementById('other-quantity');
    const otherUnitPriceInput = document.getElementById('other-unit-price');
    const otherTotalAmountInput = document.getElementById('other-total-amount');
    // Employees
    const employeeNomInput = document.getElementById('employee-nom');
    const employeePrenomInput = document.getElementById('employee-prenom');
    const employeeRoleInput = document.getElementById('employee-role');
    const employeeAdresseInput = document.getElementById('employee-adresse');
    const employeeTelephoneInput = document.getElementById('employee-telephone');
    const employeeLieuResidenceInput = document.getElementById('employee-lieu-residence');
    const employeeJoursTravailInput = document.getElementById('employee-jours-travail');
    const employeeHeureArriveeInput = document.getElementById('employee-heure-arrivee');
    const employeeHeureDepartInput = document.getElementById('employee-heure-depart');
    const employeeSalaryInput = document.getElementById('employee-salary');
    const employeePaidAmountInput = document.getElementById('employee-paid-amount');
    const employeeHireDateInput = document.getElementById('employee-hire-date');
    const employeeContactPersonNomInput = document.getElementById('employee-contact-person-nom');
    const employeeContactPersonPrenomInput = document.getElementById('employee-contact-person-prenom');
    const employeeContactPersonAdresseInput = document.getElementById('employee-contact-person-adresse');
    const employeeContactPersonTelephoneInput = document.getElementById('employee-contact-person-telephone');
    const employeeContactPersonLieuResidenceInput = document.getElementById('employee-contact-person-lieu-residence');
    // Learners
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
    const learnerGarantTelephoneInput = document.getElementById('learner-garant-telephone');
    const learnerGarantAdresseInput = document.getElementById('learner-garant-adresse');
    // Employee Permissions
    const permEmpReqDateInput = document.getElementById('perm-emp-req-date');
    const permEmpNameSelect = document.getElementById('perm-emp-name');
    const permEmpDateInput = document.getElementById('perm-emp-date');
    const permEmpReasonTextarea = document.getElementById('perm-emp-reason');
    // Learner Permissions
    const permLrnReqDateInput = document.getElementById('perm-lrn-req-date');
    const permLrnNameSelect = document.getElementById('perm-lrn-name');
    const permLrnDateInput = document.getElementById('perm-lrn-date');
    const permLrnReasonTextarea = document.getElementById('perm-lrn-reason');
    // Mobile Money Point
    const mmDateInput = document.getElementById('mm-date');
    const mmAgentInput = document.getElementById('mm-agent');
    const mmBalanceMoovInput = document.getElementById('mm-balance-moov');
    const mmBalanceMtnInput = document.getElementById('mm-balance-mtn');
    const mmBalanceCelttisInput = document.getElementById('mm-balance-celttis');
    const mmBalanceCashInput = document.getElementById('mm-balance-cash');
    const mmCreditMoovInput = document.getElementById('mm-credit-moov');
    const mmCreditMtnInput = document.getElementById('mm-credit-mtn');
    const mmCreditCelttisInput = document.getElementById('mm-credit-celttis');
    const mmPerteTransfertInput = document.getElementById('mm-perte-transfert');
    const mmPerteCreditInput = document.getElementById('mm-perte-credit');
    // MM Fournisseur
    const mmFournisseurNomInput = document.getElementById('mm-fournisseur-nom');
    const mmFournisseurPrenomInput = document.getElementById('mm-fournisseur-prenom');
    const mmFournisseurContactInput = document.getElementById('mm-fournisseur-contact');
    const mmFournisseurMontantInput = document.getElementById('mm-fournisseur-montant');
    const mmFournisseurInteretInput = document.getElementById('mm-fournisseur-interet');
    const mmFournisseurVenduInput = document.getElementById('mm-fournisseur-vendu');
    // Client Profile
    const clientProfileNomInput = document.getElementById('client-profile-nom');
    const clientProfilePrenomInput = document.getElementById('client-profile-prenom');
    const clientProfileAdresseInput = document.getElementById('client-profile-adresse');
    const clientProfileContactInput = document.getElementById('client-profile-contact');
    const clientProfileStatutInput = document.getElementById('client-profile-statut');
    // Creditor Transaction
    const creditorDateInput = document.getElementById('creditor-date');
    const creditorNameSelect = document.getElementById('creditor-name');
    const creditorDesignationInput = document.getElementById('creditor-designation');
    const creditorQuantityInput = document.getElementById('creditor-quantity');
    const creditorUnitPriceInput = document.getElementById('creditor-unit-price');
    const creditorTotalAmountDueInput = document.getElementById('creditor-total-amount-due');
    const creditorAmountPaidInput = document.getElementById('creditor-amount-paid');
    const creditorDueDateInput = document.getElementById('creditor-due-date');
    const creditorContactInput = document.getElementById('creditor-contact');
    // Debt/Loan
    const debtDateInput = document.getElementById('debt-date');
    const debtTypeSelect = document.getElementById('debt-type');
    const debtNameInput = document.getElementById('debt-name');
    const debtDescriptionInput = document.getElementById('debt-description');
    const debtAmountInput = document.getElementById('debt-amount');
    const debtDueDateInput = document.getElementById('debt-due-date');
    const debtStatusSelect = document.getElementById('debt-status');
    // Reports
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
     // Invoice Generator
     const invoiceGenDateInput = document.getElementById('invoice-gen-date');
     const invoiceGenClientNameInput = document.getElementById('invoice-gen-client-name');
     const invoiceGenClientContactInput = document.getElementById('invoice-gen-client-contact');
     const invoiceGenNumberInput = document.getElementById('invoice-gen-number');
     // Multi-item invoice elements
     const invoiceItemsContainer = document.getElementById('invoice-items-container'); // NEW
     const addInvoiceItemButton = document.getElementById('add-invoice-item-button'); // NEW
     // Overall totals
     const invoiceGenTotalAmountInput = document.getElementById('invoice-gen-total-amount');
     const invoiceGenTotalWordsInput = document.getElementById('invoice-gen-total-words');
     const previewPrintInvoiceButton = document.getElementById('preview-print-invoice-button');


    // Hidden edit fields
    const supplyEditIndexInput = document.getElementById('supply-edit-index');
    const employeeEditIndexInput = document.getElementById('employee-edit-index');
    const learnerEditIndexInput = document.getElementById('learner-edit-index');
    const mobileMoneyEditIndexInput = document.getElementById('mobile-money-edit-index');
    const mmFournisseurEditKeyInput = document.getElementById('mm-fournisseur-edit-key');
    const clientProfileEditKeyInput = document.getElementById('client-profile-edit-key');
    const debtEditIndexInput = document.getElementById('debt-edit-index');

    // Counter for unique invoice item IDs
    let invoiceItemIndex = 1; // Start from 1 since row 0 might exist statically

    // --- Variables pour stocker les données (localStorage) ---
    const loadData = (key) => {
        try {
            const data = localStorage.getItem(key);
            const parsed = data ? JSON.parse(data) : [];
            if (!Array.isArray(parsed)) {
                console.warn(`Data for key '${key}' in localStorage was not an array. Resetting.`);
                localStorage.removeItem(key);
                return [];
            }
            return parsed;
        } catch (e) {
            console.error(`Erreur lors du chargement ou parsing des données pour ${key}:`, e);
            localStorage.removeItem(key);
            return [];
        }
    };

    let salesData = loadData('salesData');
    let materielElectriqueData = loadData('materielElectriqueData');
    let expensesData = loadData('expensesData');
    let othersData = loadData('othersData');
    let supplyData = loadData('supplyData');
    let employeesData = loadData('employeesData');
    let learnersData = loadData('learnersData');
    let mobileMoneyData = loadData('mobileMoneyData');
    let mmFournisseursData = loadData('mmFournisseursData');
    let clientProfilesData = loadData('clientProfilesData');
    let creditorsData = loadData('creditorsData');
    let debtData = loadData('debtData');
    let employeePermissionsData = loadData('employeePermissionsData'); // Added
    let learnerPermissionsData = loadData('learnerPermissionsData'); // Added
    let stockData = []; // Recalculated on load/update

    // --- Fonctions Utilitaires ---

    /** Formats a number to 2 decimal places, returning '0.00' for invalid input */
    function formatAmount(amount) {
        const num = parseFloat(amount);
        return !isNaN(num) ? num.toFixed(2) : '0.00';
    }

    /** Met à jour la liste déroulante des désignations Papeterie/Mat Elec dans Ventes. */
    function updateProductDesignationsForCategory(category) {
        let targetSelect;
        let sourceData = [];
        if (category === 'Papeterie') {
            targetSelect = saleDesignationSelect;
            sourceData = stockData.filter(item => item.type === 'Papeterie' && item.remainingQuantity > 0);
        } else if (category === 'Matériels électrique') {
            targetSelect = meDesignationSelect;
            sourceData = stockData.filter(item => item.type === 'Matériels électrique' && item.remainingQuantity > 0);
        } else {
            if(saleDesignationSelect) saleDesignationSelect.innerHTML = '<option value="">-- Choisir --</option>';
            if(meDesignationSelect) meDesignationSelect.innerHTML = '<option value="">-- Choisir --</option>';
            return;
        }
        if (!targetSelect) return;
        const currentValue = targetSelect.value;
        const designations = [...new Set(sourceData.map(item => item.designation))].sort();
        targetSelect.innerHTML = '<option value="">-- Choisir --</option>' +
                                  designations.map(designation =>
                                    `<option value="${designation}" ${designation === currentValue ? 'selected' : ''}>${designation}</option>`
                                  ).join('');
    }

    /** Calcule le montant total (Qté * PU). */
    function calculateTotalAmount(quantityInput, unitPriceInput, totalAmountInput) {
        if (!quantityInput || !unitPriceInput || !totalAmountInput) return;
        const quantity = parseFloat(quantityInput.value) || 0;
        const unitPrice = parseFloat(unitPriceInput.value) || 0;
        totalAmountInput.value = formatAmount(quantity * unitPrice);
    }

     /** Calcule le montant total pour 'Divers'. */
    function calculateOtherTotalAmount() {
        if (!otherQuantityInput || !otherUnitPriceInput || !otherTotalAmountInput) return;
        const quantity = parseFloat(otherQuantityInput.value);
        const unitPriceOrAmount = parseFloat(otherUnitPriceInput.value) || 0;
        let totalAmount;
        if (isNaN(quantity) || quantity === 0 || quantity === 1) {
            totalAmount = unitPriceOrAmount;
        } else {
            totalAmount = quantity * unitPriceOrAmount;
        }
        otherTotalAmountInput.value = formatAmount(totalAmount);
    }

     /** Calcule le montant total dû pour le crédit client (Qté * PU). */
    function calculateCreditorTotalAmount() {
        if (creditorQuantityInput?.value && creditorUnitPriceInput?.value && creditorTotalAmountDueInput) {
            calculateTotalAmount(creditorQuantityInput, creditorUnitPriceInput, creditorTotalAmountDueInput);
        } else if (creditorTotalAmountDueInput && !creditorQuantityInput?.value && !creditorUnitPriceInput?.value) {
             // Keep existing value if user entered it directly
        } else {
             // Clear if only one of Qty/PU is filled? Optional.
             // creditorTotalAmountDueInput.value = '';
        }
    }

    /** Définit la date du jour par défaut et initialise les champs de période. */
    function setTodaysDate() {
        const today = new Date().toISOString().split('T')[0];
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');

        [   'sale-date', 'supply-date', 'mm-date',
            'creditor-date', 'creditor-due-date',
            'employee-hire-date',
            'debt-date', 'debt-due-date',
            'report-date',
            'perm-emp-req-date', 'perm-lrn-req-date', // Added
            'invoice-gen-date' // Added
        ].forEach(id => {
                const element = document.getElementById(id);
                if (element && element.type === 'date' && !element.value) {
                    element.value = today;
                }
            });
        ['employee-heure-arrivee', 'employee-heure-depart'].forEach(id => {
             const element = document.getElementById(id);
             if (element && !element.value) { /* Default time if desired */ }
        });

        if (reportYearInput && !reportYearInput.value) reportYearInput.value = year;
        if(reportMonthInput && !reportMonthInput.value) reportMonthInput.value = `${year}-${month}`;
        if(reportWeekInput && !reportWeekInput.value){
            try {
                const currentThursday = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
                currentThursday.setUTCDate(currentThursday.getUTCDate() + 4 - (currentThursday.getUTCDay() || 7));
                const yearStart = new Date(Date.UTC(currentThursday.getUTCFullYear(), 0, 1));
                const weekNo = Math.ceil((((currentThursday - yearStart) / 86400000) + 1) / 7);
                const weekYear = currentThursday.getUTCFullYear();
                reportWeekInput.value = `${weekYear}-W${weekNo.toString().padStart(2,'0')}`;
            } catch (dateError) { console.error("Erreur calcul semaine par défaut:", dateError); }
        }
    }

    /** Affiche ou masque un élément en togglant la classe 'hidden'. */
    function toggleVisibility(element) {
        if (element) element.classList.toggle('hidden');
    }

    /** Gère la visibilité exclusive des sous-sections Ventes/Divers (tables). */
    function toggleSalesSubSectionVisibility(containerToShow) {
        const allSalesSubSections = [ salesDetailsContainer, materielElectriqueDetailsContainer, expensesDetailsContainer, othersDetailsContainer ];
        allSalesSubSections.forEach(container => {
            if (container) {
                if (container === containerToShow && container.classList.contains('hidden')) {
                    container.classList.remove('hidden');
                } else if (container !== containerToShow) {
                    container.classList.add('hidden');
                } else if (container === containerToShow && !container.classList.contains('hidden')) {
                    container.classList.add('hidden');
                }
            }
        });
    }

    /** Affiche une section principale et masque les autres, ainsi que tous les détails. */
    function setSectionVisibility(sectionToShow, sectionsToHide) {
         if (!sectionToShow) return;
        sectionsToHide.forEach(section => { if(section) section.classList.add('hidden'); });
        sectionToShow.classList.remove('hidden');

        const allDetailContainers = [
            supplyListContainer, stockDetailsContainer,
            salesDetailsContainer, materielElectriqueDetailsContainer, expensesDetailsContainer, othersDetailsContainer,
            employeesDetailsContainer, learnersDetailsContainer, employeePermissionsContainer, learnerPermissionsContainer, // Added
            mobileMoneyDetailsContainer, mmFournisseursDetailsContainer,
            clientProfilesContainer, creditorsDetailsContainer,
            debtDetailsContainer,
            reportDetailsContainer, reportFilters
        ];
        allDetailContainers.forEach(container => { if (container) container.classList.add('hidden'); });
        if (showReportDetailsButton) showReportDetailsButton.classList.add('hidden');
        // Ensure invoice generator is hidden when switching main sections UNLESS it's the target
        if (invoiceGeneratorSection && sectionToShow !== invoiceGeneratorSection) {
            invoiceGeneratorSection.classList.add('hidden');
        }
    }

    /** Gère l'affichage des sous-formulaires dans Ventes/Divers. */
    function handleOperationTypeChange() {
        if (!operationTypeSelect) return;
        const type = operationTypeSelect.value;
        const showPapeterie = (type === 'Papeterie');
        const showMaterielElectrique = (type === 'Matériels électrique');
        const showDepenses = (type === 'Dépenses');
        const showDivers = (type === 'Divers');

        if(papeterieDetailsForm) papeterieDetailsForm.classList.toggle('hidden', !showPapeterie);
        if(materielElectriqueDetailsForm) materielElectriqueDetailsForm.classList.toggle('hidden', !showMaterielElectrique);
        if(depensesDetailsForm) depensesDetailsForm.classList.toggle('hidden', !showDepenses);
        if(diversDetailsForm) diversDetailsForm.classList.toggle('hidden', !showDivers);

        if (showPapeterie) updateProductDesignationsForCategory('Papeterie');
        else if (showMaterielElectrique) updateProductDesignationsForCategory('Matériels électrique');
        else updateProductDesignationsForCategory(''); // Clear both if not stockable type

        // Reset fields in hidden sub-forms
        if (!showPapeterie) {
             if (saleDesignationSelect) saleDesignationSelect.selectedIndex = 0;
             if (saleQuantityInput) saleQuantityInput.value = '';
             if (saleUnitPriceInput) saleUnitPriceInput.value = '';
             if (saleTotalAmountInput) saleTotalAmountInput.value = '';
        }
        if (!showMaterielElectrique) {
            if (meDesignationSelect) meDesignationSelect.selectedIndex = 0;
            if (meQuantityInput) meQuantityInput.value = '';
            if (meUnitPriceInput) meUnitPriceInput.value = '';
            if (meTotalAmountInput) meTotalAmountInput.value = '';
        }
        if (!showDepenses) {
            if (expenseReasonInput) expenseReasonInput.value = '';
            if (expenseAmountInput) expenseAmountInput.value = '';
        }
        if (!showDivers) {
            if (otherDesignationInput) otherDesignationInput.value = '';
            if (otherQuantityInput) otherQuantityInput.value = '';
            if (otherUnitPriceInput) otherUnitPriceInput.value = '';
            if (otherTotalAmountInput) otherTotalAmountInput.value = '';
        }
    }

     /** Prépare le DOM pour l'impression de TABLEAU et lance l'impression système. */
    function printSpecificTable(containerId) {
        const containerToPrint = document.getElementById(containerId);
        if (!containerToPrint) { console.error("Conteneur à imprimer non trouvé:", containerId); alert("Erreur: Impossible de trouver le contenu à imprimer."); return; }
        document.body.classList.add('printing-active'); // Class for table printing styles
        containerToPrint.classList.add('show-in-print');
        const afterPrintHandler = () => {
            document.body.classList.remove('printing-active');
            containerToPrint.classList.remove('show-in-print');
            window.removeEventListener('afterprint', afterPrintHandler); window.removeEventListener('unload', afterPrintHandler);
        };
        window.addEventListener('afterprint', afterPrintHandler); window.addEventListener('unload', afterPrintHandler);
        try {
            window.print();
             setTimeout(() => { if (document.body.classList.contains('printing-active')) { console.warn("afterprint event likely failed, cleaning up via timeout."); afterPrintHandler(); } }, 1500);
        } catch (e) { console.error("Erreur window.print():", e); alert("Erreur lancement impression."); afterPrintHandler(); }
    }

    /** Prépare le DOM pour l'impression d'INVOICE et lance l'impression système. */
    function printElement(elementId) {
        const elementToPrint = document.getElementById(elementId);
        if (!elementToPrint) { console.error("Element to print not found:", elementId); alert("Erreur: Contenu à imprimer introuvable."); return; }

        // Ensure content is set before adding classes
        if (!elementToPrint.innerHTML.trim()) {
            console.error("Print area is empty:", elementId);
            alert("Erreur: Le contenu de l'impression est vide.");
            return;
        }

        document.body.classList.add('printing-invoice'); // Class for invoice printing styles
        elementToPrint.classList.add('show-in-print');
        elementToPrint.classList.remove('hidden');

        const afterPrintHandler = () => {
            document.body.classList.remove('printing-invoice');
            elementToPrint.classList.remove('show-in-print');
            elementToPrint.classList.add('hidden');
            window.removeEventListener('afterprint', afterPrintHandler);
            window.removeEventListener('unload', afterPrintHandler); // Also remove unload listener
        };

        window.addEventListener('afterprint', afterPrintHandler);
        window.addEventListener('unload', afterPrintHandler); // Add unload listener for safety

        // Slight delay to help browser render the content WITH the image before printing
        // Combined with preloading, this should be more robust.
        setTimeout(() => {
             try {
                 window.print();
                 // Setup a fallback cleanup in case afterprint doesn't fire reliably
                 setTimeout(() => {
                     if (document.body.classList.contains('printing-invoice')) {
                         console.warn("afterprint event likely failed for invoice, cleaning up via timeout.");
                         afterPrintHandler();
                     }
                 }, 1500); // Adjust timeout as needed, 1.5s is generous
             } catch (e) {
                 console.error("Erreur window.print():", e);
                 alert("Erreur lors du lancement de l'impression.");
                 afterPrintHandler(); // Clean up immediately on error
             }
        }, 100); // 100ms delay - adjust if needed, but keep it short
    }


    /** Exporte une table HTML vers Excel. */
    function exportToExcel(tableId, fileName) {
        try {
            const table = document.getElementById(tableId);
            if (!table) throw new Error(`Tableau ID '${tableId}' non trouvé.`);
            if (typeof XLSX === 'undefined') throw new Error("Librairie XLSX non chargée.");
            const tableClone = table.cloneNode(true);
            const actionHeaderIndex = Array.from(tableClone.querySelectorAll('thead th')).findIndex(th => th.classList.contains('actions-header'));
            if (actionHeaderIndex !== -1) { Array.from(tableClone.rows).forEach(row => { if (row.cells.length > actionHeaderIndex) row.deleteCell(actionHeaderIndex); }); }
            const worksheet = XLSX.utils.table_to_sheet(tableClone, { raw: true });
            const columnWidths = [];
            if (worksheet['!ref']) {
                 const range = XLSX.utils.decode_range(worksheet['!ref']);
                 for (let C = range.s.c; C <= range.e.c; ++C) {
                     let maxLen = 0; const headerAddr = {c: C, r: range.s.r}; const headerRef = XLSX.utils.encode_cell(headerAddr);
                     if(worksheet[headerRef]) maxLen = String(worksheet[headerRef].v || '').length;
                     for (let R = range.s.r + 1; R <= range.e.r; ++R) {
                         const cellAddress = { c: C, r: R }; const cellRef = XLSX.utils.encode_cell(cellAddress); if (!worksheet[cellRef]) continue;
                         const cellText = worksheet[cellRef].v !== null && worksheet[cellRef].v !== undefined ? String(worksheet[cellRef].v) : '';
                         if (cellText.length > maxLen) maxLen = cellText.length;
                     }
                     columnWidths[C] = { wch: Math.max(12, maxLen + 4) };
                 }
                 if (columnWidths.length > 0) worksheet['!cols'] = columnWidths;
            }
            const workbook = XLSX.utils.book_new(); XLSX.utils.book_append_sheet(workbook, worksheet, "Données");
            XLSX.writeFile(workbook, fileName || "Export.xlsx");
        } catch (error) { console.error("Erreur export Excel:", error); alert(`Erreur export Excel: ${error.message}`); }
    }

    /** Exporte une table HTML vers PDF. */
    function exportToPdf(tableId, fileName) {
        try {
            const table = document.getElementById(tableId);
            if (!table) throw new Error(`Tableau ID '${tableId}' non trouvé.`);
            const container = table.closest('.printable-content'); const titleElement = container?.querySelector('h3');
            const title = titleElement ? titleElement.innerText : `Export PDF`;
            if (typeof jspdf === 'undefined' || !jspdf.jsPDF || typeof jspdf.plugin === 'undefined' || typeof jspdf.plugin.autotable === 'undefined') { throw new Error("Librairies PDF non chargées."); }
            const { jsPDF } = window.jspdf;
             const actionHeaderIndex = Array.from(table.querySelectorAll('thead th')).findIndex(th => th.classList.contains('actions-header'));
             const headers = Array.from(table.querySelectorAll('thead th')).filter((_, index) => index !== actionHeaderIndex).map(th => th.innerText.trim());
            const colCount = headers.length; const orientation = colCount > 7 ? "landscape" : "portrait";
            const doc = new jsPDF({ orientation: orientation, unit: "pt", format: "a4" });
            doc.setFontSize(16); doc.setTextColor(40, 40, 40); doc.text(title, 40, 50);
             doc.autoTable({
                 html: `#${tableId}`, startY: 70, theme: 'grid',
                 headStyles: { fillColor: [26, 58, 109], textColor: 255, fontStyle: 'bold', halign: 'center' },
                 styles: { fontSize: orientation === "landscape" ? 8 : 9, cellPadding: 4, overflow: 'linebreak', lineWidth: 0.5, lineColor: [222, 226, 230] },
                 alternateRowStyles: { fillColor: [248, 249, 250] },
                 margin: { top: 70, right: 30, bottom: 40, left: 30 }, tableWidth: 'auto',
                 columns: Array.from(table.querySelectorAll('thead th')).map((th, index) => index).filter(index => index !== actionHeaderIndex),
                 didParseCell: function(data) {
                     if (data.cell.section === 'body' && data.column.index !== undefined) {
                         let originalColIndex = -1; let currentExportedCol = -1;
                         for(let i = 0; i < table.rows[0].cells.length; i++) {
                             if (i !== actionHeaderIndex) { currentExportedCol++; if (currentExportedCol === data.column.index) { originalColIndex = i; break; } }
                         }
                         if (originalColIndex !== -1) {
                             const originalHeaderCell = table.rows[0].cells[originalColIndex]; const headerClasses = originalHeaderCell.classList;
                             if (headerClasses.contains('unit-price-col') || headerClasses.contains('salary-col') || headerClasses.contains('amount-col') || headerClasses.contains('total-cost-col') || headerClasses.contains('balance-col') || headerClasses.contains('credit-col') || headerClasses.contains('remaining-salary-col')) {
                                 data.cell.styles.halign = 'right';
                             } else if (headerClasses.contains('quantity-col') || headerClasses.contains('supply-col') || headerClasses.contains('sold-col') || headerClasses.contains('remaining-col') || headerClasses.contains('age-col') || headerClasses.contains('interest-col')) {
                                 data.cell.styles.halign = 'center';
                             } else { data.cell.styles.halign = 'left'; }
                         }
                     }
                 }
             });
            const pageCount = doc.internal.getNumberOfPages(); doc.setFontSize(8); doc.setTextColor(100);
             for(let i = 1; i <= pageCount; i++) { doc.setPage(i); doc.text('Page ' + String(i) + ' sur ' + String(pageCount), doc.internal.pageSize.width - 60, doc.internal.pageSize.height - 20); }
            doc.save(fileName || 'Export.pdf');
        } catch (error) { console.error("Erreur export PDF:", error); alert(`Erreur export PDF: ${error.message}`); }
    }

    /** Calcule la date du lundi pour une semaine ISO. */
    function getDateOfISOWeek(w, y) {
         if (isNaN(w) || isNaN(y) || w < 1 || w > 53) return new Date(NaN);
         try {
             const simpleDate = new Date(Date.UTC(y, 0, 4)); const dayOfWeekJan4 = simpleDate.getUTCDay() || 7;
             const mondayOfWeek1 = new Date(simpleDate); mondayOfWeek1.setUTCDate(simpleDate.getUTCDate() - dayOfWeekJan4 + 1);
             const targetMonday = new Date(mondayOfWeek1); targetMonday.setUTCDate(mondayOfWeek1.getUTCDate() + (w - 1) * 7);
             const thursdayOfWeek = new Date(targetMonday); thursdayOfWeek.setUTCDate(targetMonday.getUTCDate() + 3);
             if (thursdayOfWeek.getUTCFullYear() !== y) console.warn(`Calculated start date for week ${w}, ${y} falls into year ${thursdayOfWeek.getUTCFullYear()}.`);
             return targetMonday;
         } catch(e) { console.error(`Erreur getDateOfISOWeek(${w}, ${y}):`, e); return new Date(NaN); }
    }

    /** Populates the employee select dropdown for permission form */
    function populateEmployeeSelectForPermission() {
        if (!permEmpNameSelect || !employeesData) return;
        const currentVal = permEmpNameSelect.value;
        permEmpNameSelect.innerHTML = '<option value="">-- Choisir Employé --</option>';
        const sortedEmployees = [...employeesData].sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
        sortedEmployees.forEach(emp => {
            const fullName = `${emp.nom || ''} ${emp.prenom || ''}`.trim();
            if (fullName) {
                const option = document.createElement('option');
                option.value = fullName; option.textContent = fullName;
                permEmpNameSelect.appendChild(option);
            }
        });
        if (Array.from(permEmpNameSelect.options).some(opt => opt.value === currentVal)) { permEmpNameSelect.value = currentVal; }
        else { permEmpNameSelect.selectedIndex = 0; }
    }

    /** Populates the learner select dropdown for permission form */
    function populateLearnerSelectForPermission() {
        if (!permLrnNameSelect || !learnersData) return;
        const currentVal = permLrnNameSelect.value;
        permLrnNameSelect.innerHTML = '<option value="">-- Choisir Apprenant --</option>';
        const sortedLearners = [...learnersData].sort((a, b) => (a.nom || '').localeCompare(b.nom || ''));
        sortedLearners.forEach(lrn => {
            const fullName = `${lrn.nom || ''} ${lrn.prenom || ''}`.trim();
            if (fullName) {
                const option = document.createElement('option');
                option.value = fullName; option.textContent = fullName;
                permLrnNameSelect.appendChild(option);
            }
        });
        if (Array.from(permLrnNameSelect.options).some(opt => opt.value === currentVal)) { permLrnNameSelect.value = currentVal; }
        else { permLrnNameSelect.selectedIndex = 0; }
    }

    /** Generates the next invoice number */
    function generateInvoiceNumber() {
        const year = new Date().getFullYear();
        let lastNumber = parseInt(localStorage.getItem('lastInvoiceNumber') || '0', 10);
        lastNumber++;
        localStorage.setItem('lastInvoiceNumber', lastNumber.toString());
        return `FACT-${year}-${lastNumber.toString().padStart(5, '0')}`;
    }

    /** Converts a number to French words (Simplified) */
    function numberToWordsFrench(num) {
        if (num === null || num === undefined || isNaN(num)) return '';
        num = Math.abs(num);
        const belowTwenty = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf"];
        const tens = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante", "soixante-dix", "quatre-vingt", "quatre-vingt-dix"];
        function convert(n) {
            if (n < 0) return "moins " + convert(-n);
            if (n < 20) return belowTwenty[n];
            if (n < 70) {
                let ten = Math.floor(n / 10); let unit = n % 10; if (unit === 0) return tens[ten];
                if (unit === 1 && ten !== 8) return tens[ten] + "-et-" + belowTwenty[unit]; // Fixed typo: belowTwent -> belowTwenty
                return tens[ten] + (unit ? "-" + belowTwenty[unit] : "");
            }
            if (n < 80) { return "soixante" + (n === 71 ? "-et-" : "-") + belowTwenty[n - 60]; }
            if (n < 100) {
                let unit = n % 10;
                if (unit === 0) return tens[8] + (n === 80 ? "s" : ""); // Fix: quatre-vingt needs s
                // Fix for 81-99: quatre-vingt-un, quatre-vingt-deux etc.
                return tens[8] + (n === 80 ? "" : "-") + belowTwenty[n - 80];
            }
            if (n < 200) return "cent" + (n % 100 === 0 ? "" : " " + convert(n % 100));
            if (n < 1000) {
                let h = Math.floor(n / 100);
                 // Fix: deux cents, trois cents etc. (need 's' if no unit follows)
                 let hWord = (h > 1 ? belowTwenty[h] + " " : "") + "cent" + (h > 1 && n % 100 === 0 ? "s" : "");
                 return hWord + (n % 100 === 0 ? "" : " " + convert(n % 100));
            }
            if (n < 2000) return "mille" + (n % 1000 === 0 ? "" : " " + convert(n % 1000));
            if (n < 1000000) {
                let t = Math.floor(n / 1000);
                // Fix: mille is invariable
                return convert(t) + " mille" + (n % 1000 === 0 ? "" : " " + convert(n % 1000));
            }
            // Add handling for millions if needed
            if (n < 2000000) return "un million" + (n % 1000000 === 0 ? "" : " " + convert(n % 1000000));
             if (n < 1000000000) {
                 let m = Math.floor(n / 1000000);
                 return convert(m) + " million" + (m > 1 ? "s" : "") + (n % 1000000 === 0 ? "" : " " + convert(n % 1000000));
             }

            return num.toString(); // Fallback for very large numbers
        }
        const integerPart = Math.floor(num); const decimalPart = Math.round((num - integerPart) * 100);
        let words = convert(integerPart); words = words.charAt(0).toUpperCase() + words.slice(1);
        let currency = " Francs CFA"; let decimalWords = "";
        if (decimalPart > 0) decimalWords = " et " + convert(decimalPart) + " centimes";
        return (words + currency + decimalWords).replace(/\s+/g, ' ').trim();
    }


    // --- Fonctions de mise à jour des Tableaux HTML ---

    function updateSupplyTable() {
        if (!supplyTable) return;
        supplyTable.innerHTML = '';
        supplyData.forEach((supply, index) => {
            const row = supplyTable.insertRow();
            row.insertCell().textContent = supply.date || '-';
            row.insertCell().textContent = supply.type || '-';
            row.insertCell().textContent = supply.designation || '-';
            const quantityCell = row.insertCell(); quantityCell.textContent = supply.quantity || '-'; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(supply.unitPrice); priceCell.classList.add('unit-price-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(supply.totalAmount); totalCell.classList.add('amount-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Approvisionnement" title="Modifier" onclick="editSupply(${index})">✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Approvisionnement" title="Supprimer" onclick="deleteSupply(${index})">❌</button>
            `;
        });
    }

    function updateSalesTable() { // Papeterie
        if (!salesTable) return;
        salesTable.innerHTML = '';
        salesData.forEach((sale, index) => {
            const row = salesTable.insertRow();
            row.insertCell().textContent = sale.date || '-';
            row.insertCell().textContent = sale.designation || '-';
            const quantityCell = row.insertCell(); quantityCell.textContent = sale.quantity || '-'; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(sale.unitPrice); priceCell.classList.add('unit-price-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(sale.totalAmount); totalCell.classList.add('amount-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `<button class="action-btn delete-btn" aria-label="Supprimer Vente Papeterie" title="Supprimer" onclick="deleteSale(${index})">❌</button>`;
        });
    }

    function updateMaterielElectriqueTable() { // Mat Elec
        if (!materielElectriqueTable) return;
        materielElectriqueTable.innerHTML = '';
        materielElectriqueData.forEach((sale, index) => {
            const row = materielElectriqueTable.insertRow();
            row.insertCell().textContent = sale.date || '-';
            row.insertCell().textContent = sale.designation || '-';
            const quantityCell = row.insertCell(); quantityCell.textContent = sale.quantity || '-'; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(sale.unitPrice); priceCell.classList.add('unit-price-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(sale.totalAmount); totalCell.classList.add('amount-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `<button class="action-btn delete-btn" aria-label="Supprimer Vente Mat. Elec." title="Supprimer" onclick="deleteMaterielElectriqueSale(${index})">❌</button>`;
        });
    }

    function updateExpensesTable() { // Dépenses
        if (!expensesTable) return;
        expensesTable.innerHTML = '';
        expensesData.forEach((expense, index) => {
            const row = expensesTable.insertRow();
            row.insertCell().textContent = expense.date || '-';
            row.insertCell().textContent = expense.reason || '-';
            const amountCell = row.insertCell(); amountCell.textContent = formatAmount(expense.amount); amountCell.classList.add('amount-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `<button class="action-btn delete-btn" aria-label="Supprimer Dépense" title="Supprimer" onclick="deleteExpense(${index})">❌</button>`;
        });
    }

    function updateOthersTable() { // Divers
        if (!othersTable) return;
        othersTable.innerHTML = '';
        othersData.forEach((other, index) => {
            const row = othersTable.insertRow();
            row.insertCell().textContent = other.date || '-';
            row.insertCell().textContent = other.designation || '-';
            const quantityDisplay = other.quantity !== null ? other.quantity : '-';
            const quantityCell = row.insertCell(); quantityCell.textContent = quantityDisplay; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(other.unitPrice); priceCell.classList.add('unit-price-col');
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(other.totalAmount); totalCell.classList.add('amount-col');
             const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `<button class="action-btn delete-btn" aria-label="Supprimer Opération Diverse" title="Supprimer" onclick="deleteOther(${index})">❌</button>`;
        });
    }

    function calculateStock(supply, papeterieSales, meSales) {
        let stock = {}; // Use designation as key
        supply.forEach(item => {
            const key = item.designation?.trim();
            if (!key || (item.type !== 'Papeterie' && item.type !== 'Matériels électrique')) return;
            const quantity = parseFloat(item.quantity) || 0; if (quantity <= 0) return;
            if (!stock[key]) stock[key] = { designation: key, type: item.type, supplyQuantity: 0, soldQuantity: 0, remainingQuantity: 0, date: item.date };
            else if (stock[key].type !== item.type) { console.warn(`Stock Calc Conflict: Design. '${key}' exists as ${stock[key].type}, new supply is ${item.type}. Ignored.`); return; }
            stock[key].supplyQuantity += quantity; stock[key].remainingQuantity += quantity;
            if (!stock[key].date || (item.date && new Date(item.date) > new Date(stock[key].date))) { stock[key].date = item.date; }
        });
        const allStockableSales = [...papeterieSales, ...meSales];
        allStockableSales.forEach(item => {
            const key = item.designation?.trim(); if (!key) return;
            const quantity = parseFloat(item.quantity) || 0; if (quantity <= 0) return;
            if (stock[key]) {
                 if (stock[key].type !== item.type) { console.warn(`Stock Calc Conflict: Sale of '${key}' (${item.type}) doesn't match stock type (${stock[key].type}). Sale ignored for stock.`); return; }
                stock[key].soldQuantity += quantity; stock[key].remainingQuantity -= quantity;
                if (!stock[key].date || (item.date && new Date(item.date) > new Date(stock[key].date))) { stock[key].date = item.date; }
                 if (Math.abs(stock[key].remainingQuantity) < 0.001) { stock[key].remainingQuantity = 0; }
            } else {
                console.warn(`Stock Calc: Sale for '${key}' (${item.type}) without matching supply recorded.`);
                stock[key] = { designation: key, type: item.type, supplyQuantity: 0, soldQuantity: quantity, remainingQuantity: -quantity, date: item.date };
            }
        });
        return Object.values(stock).sort((a, b) => { const tc = (a.type || '').localeCompare(b.type || ''); return tc !== 0 ? tc : (a.designation || '').localeCompare(b.designation || ''); });
    }

    function updateStockTable() {
        if (!stockTable) return;
        stockData = calculateStock(supplyData, salesData, materielElectriqueData);
        stockTable.innerHTML = '';
        stockData.forEach(stock => {
            const row = stockTable.insertRow();
            row.insertCell().textContent = stock.type || '-';
            row.insertCell().textContent = stock.date || '-'; // Date of last modification
            row.insertCell().textContent = stock.designation || '-';
            const supplyQtyCell = row.insertCell(); supplyQtyCell.textContent = stock.supplyQuantity || 0; supplyQtyCell.classList.add('supply-col');
            const soldQtyCell = row.insertCell(); soldQtyCell.textContent = stock.soldQuantity || 0; soldQtyCell.classList.add('sold-col');
            const remainingQtyCell = row.insertCell(); remainingQtyCell.textContent = stock.remainingQuantity || 0; remainingQtyCell.classList.add('remaining-col');
            row.style.backgroundColor = ''; row.style.color = ''; // Reset styles
            const remaining = stock.remainingQuantity || 0;
            if (remaining <= 0) { row.style.backgroundColor = '#f8d7da'; row.style.color = '#721c24'; }
            else if (remaining < 5) { row.style.backgroundColor = '#fff3cd'; row.style.color = '#856404'; }
        });
         updateProductDesignationsForCategory('Papeterie');
         updateProductDesignationsForCategory('Matériels électrique');
    }

    function updateEmployeesTable() {
        if (!employeesTable) return;
        employeesTable.innerHTML = '';
        employeesData.forEach((employee, index) => {
            const row = employeesTable.insertRow();
            row.insertCell().textContent = employee.nom || '-'; row.insertCell().textContent = employee.prenom || '-'; row.insertCell().textContent = employee.statut || '-';
            row.insertCell().textContent = employee.hireDate || '-'; row.insertCell().textContent = employee.adresse || '-'; row.insertCell().textContent = employee.telephone || '-';
            row.insertCell().textContent = employee.lieuResidence || '-'; row.insertCell().textContent = employee.joursTravail || '-';
            row.insertCell().textContent = employee.heureArrivee || '-'; row.insertCell().textContent = employee.heureDepart || '-';
            const salary = employee.salary !== null ? parseFloat(employee.salary) : 0;
            const paidAmount = employee.paidAmount || 0; const remainingSalary = salary - paidAmount;
            let salaryCell = row.insertCell(); salaryCell.textContent = formatAmount(salary); salaryCell.classList.add('salary-col');
            let paidCell = row.insertCell(); paidCell.textContent = formatAmount(paidAmount); paidCell.classList.add('amount-col');
            let remainingCell = row.insertCell(); remainingCell.textContent = formatAmount(remainingSalary); remainingCell.classList.add('amount-col', 'remaining-salary-col');
            row.insertCell().textContent = `${employee.contactPersonNom || ''} ${employee.contactPersonPrenom || ''}`.trim() || '-';
            row.insertCell().textContent = employee.contactPersonTelephone || '-';
            remainingCell.style.fontWeight = 'bold';
            if (remainingSalary <= 0.005) { remainingCell.style.color = 'var(--color-success)'; }
            else if (paidAmount > 0) { remainingCell.style.color = 'var(--color-accent)'; }
            else { remainingCell.style.color = 'var(--color-danger)'; }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Employé" title="Modifier" onclick="editEmployee(${index})">✏️</button>
                 <button class="action-btn pay-btn" aria-label="Enregistrer Paiement Salaire" title="Payer" onclick="recordSalaryPayment(${index})">💲</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Employé" title="Supprimer" onclick="deleteEmployee(${index})">❌</button>
            `;
        });
    }

    function updateLearnersTable() {
        if (!learnersTable) return;
        learnersTable.innerHTML = '';
        learnersData.forEach((learner, index) => {
            const row = learnersTable.insertRow();
            row.insertCell().textContent = learner.nom || '-'; row.insertCell().textContent = learner.prenom || '-';
            row.insertCell().textContent = learner.age || '-'; row.cells[row.cells.length-1].classList.add('age-col');
            row.insertCell().textContent = learner.adresse || '-'; row.insertCell().textContent = learner.lieuResidence || '-';
            row.insertCell().textContent = learner.niveauEtudes || '-'; row.insertCell().textContent = learner.situationMatrimoniale || '-';
            row.insertCell().textContent = `${learner.pereNom || ''} ${learner.perePrenom || ''}`.trim() || '-';
            row.insertCell().textContent = `${learner.mereNom || ''} ${learner.merePrenom || ''}`.trim() || '-';
            row.insertCell().textContent = learner.filiere || '-'; row.insertCell().textContent = learner.dureeFormation || '-';
            let cellDocs = row.insertCell(); cellDocs.textContent = formatAmount(learner.fraisDocuments); cellDocs.classList.add('amount-col');
            let cellT1 = row.insertCell(); cellT1.textContent = formatAmount(learner.tranche1); cellT1.classList.add('amount-col');
            let cellT2 = row.insertCell(); cellT2.textContent = formatAmount(learner.tranche2); cellT2.classList.add('amount-col');
            let cellT3 = row.insertCell(); cellT3.textContent = formatAmount(learner.tranche3); cellT3.classList.add('amount-col');
            let cellT4 = row.insertCell(); cellT4.textContent = formatAmount(learner.tranche4); cellT4.classList.add('amount-col');
            row.insertCell().textContent = `${learner.garantNom || ''} ${learner.garantPrenom || ''}`.trim() || '-';
            row.insertCell().textContent = learner.garantTelephone || '-'; row.insertCell().textContent = learner.garantAdresse || '-';
             const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
             actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Apprenant" title="Modifier" onclick="editLearner(${index})">✏️</button>
                 <button class="action-btn pay-btn" aria-label="Enregistrer Paiement Tranche" title="Payer Tranche" onclick="recordTranchePayment(${index})">💲</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Apprenant" title="Supprimer" onclick="deleteLearner(${index})">❌</button>
             `;
        });
    }

    function updateMobileMoneyTable() { // Points Journaliers MM
        if (!mobileMoneyTable) return;
        mobileMoneyTable.innerHTML = '';
        const sortedMMData = [...mobileMoneyData].sort((a, b) => (b.date || '').localeCompare(a.date || ''));
        sortedMMData.forEach((transaction) => {
            const row = mobileMoneyTable.insertRow();
            const balanceMoov = transaction.balanceMoov || 0, balanceMTN = transaction.balanceMTN || 0, balanceCelttis = transaction.balanceCelttis || 0, balanceCash = transaction.balanceCash || 0;
            const creditMoov = transaction.creditMoov || 0, creditMTN = transaction.creditMTN || 0, creditCelttis = transaction.creditCelttis || 0;
            const perteTransfert = transaction.perteTransfert || 0; const perteCredit = transaction.perteCredit || 0;
            const totalBalance = balanceMoov + balanceMTN + balanceCelttis + balanceCash; const totalCredit = creditMoov + creditMTN + creditCelttis;
            row.insertCell().textContent = transaction.date || '-'; row.insertCell().textContent = transaction.agent || '-';
            let cellBM = row.insertCell(); cellBM.textContent = formatAmount(balanceMoov); cellBM.classList.add('balance-col');
            let cellBMTN = row.insertCell(); cellBMTN.textContent = formatAmount(balanceMTN); cellBMTN.classList.add('balance-col');
            let cellBC = row.insertCell(); cellBC.textContent = formatAmount(balanceCelttis); cellBC.classList.add('balance-col');
            let cellBCash = row.insertCell(); cellBCash.textContent = formatAmount(balanceCash); cellBCash.classList.add('balance-col');
            let cellTotalB = row.insertCell(); cellTotalB.textContent = formatAmount(totalBalance); cellTotalB.classList.add('balance-col'); cellTotalB.style.fontWeight = 'bold';
            let cellCM = row.insertCell(); cellCM.textContent = formatAmount(creditMoov); cellCM.classList.add('credit-col');
            let cellCMTN = row.insertCell(); cellCMTN.textContent = formatAmount(creditMTN); cellCMTN.classList.add('credit-col');
            let cellCC = row.insertCell(); cellCC.textContent = formatAmount(creditCelttis); cellCC.classList.add('credit-col');
            let cellTotalC = row.insertCell(); cellTotalC.textContent = formatAmount(totalCredit); cellTotalC.classList.add('credit-col'); cellTotalC.style.fontWeight = 'bold';
            let cellPT = row.insertCell(); cellPT.textContent = formatAmount(perteTransfert); cellPT.classList.add('amount-col');
            let cellPC = row.insertCell(); cellPC.textContent = formatAmount(perteCredit); cellPC.classList.add('amount-col');
            const originalIndex = mobileMoneyData.findIndex(item => item.date === transaction.date && item.agent === transaction.agent );
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Point MM" title="Modifier" onclick="editMobileMoney(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>✏️</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Point MM" title="Supprimer" onclick="deleteMobileMoney(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>❌</button>
             `;
        });
    }

    function updateMmFournisseursTable() {
        if (!mmFournisseursTable) return;
        mmFournisseursTable.innerHTML = '';
         const sortedFournisseurs = [...mmFournisseursData].sort((a, b) => { const nc = (a.nom || '').localeCompare(b.nom || ''); return nc !== 0 ? nc : (a.prenom || '').localeCompare(b.prenom || ''); });
        sortedFournisseurs.forEach(f => {
            const row = mmFournisseursTable.insertRow();
            const montantFourni = f.montantFourni || 0; const creditVendu = f.creditVendu || 0; const creditRestant = montantFourni - creditVendu;
            row.insertCell().textContent = f.nom || '-'; row.insertCell().textContent = f.prenom || '-'; row.insertCell().textContent = f.contact || '-';
            let cellMF = row.insertCell(); cellMF.textContent = formatAmount(montantFourni); cellMF.classList.add('amount-col');
            let cellI = row.insertCell(); cellI.textContent = (f.interet !== null && f.interet !== undefined) ? `${f.interet}%` : '-'; cellI.classList.add('interest-col');
            let cellCV = row.insertCell(); cellCV.textContent = formatAmount(creditVendu); cellCV.classList.add('amount-col');
            let cellCR = row.insertCell(); cellCR.textContent = formatAmount(creditRestant); cellCR.classList.add('amount-col'); cellCR.style.fontWeight = 'bold';
            cellCR.style.color = creditRestant <= 0.005 ? 'var(--color-success)' : 'var(--color-danger)';
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
             const safeNom = (f.nom || '').replace(/'/g, "\\'"); const safePrenom = (f.prenom || '').replace(/'/g, "\\'");
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" aria-label="Modifier Fournisseur MM" title="Modifier" onclick="editMmFournisseur('${safeNom}', '${safePrenom}')">✏️</button>
                <button class="action-btn delete-btn" aria-label="Supprimer Fournisseur MM" title="Supprimer" onclick="deleteMmFournisseur('${safeNom}', '${safePrenom}')">❌</button>
            `;
        });
    }

    function updateClientProfilesTable() {
        if (!clientProfilesTable) return;
        clientProfilesTable.innerHTML = '';
        const sortedProfiles = [...clientProfilesData].sort((a, b) => { const nc = (a.nom || '').localeCompare(b.nom || ''); return nc !== 0 ? nc : (a.prenom || '').localeCompare(b.prenom || ''); });
        sortedProfiles.forEach(p => {
            const row = clientProfilesTable.insertRow();
            row.insertCell().textContent = p.nom || '-'; row.insertCell().textContent = p.prenom || '-';
            row.insertCell().textContent = p.adresse || '-'; row.insertCell().textContent = p.contact || '-'; row.cells[row.cells.length-1].classList.add('contact-col');
            row.insertCell().textContent = p.statut || '-'; row.cells[row.cells.length-1].classList.add('status-col');
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            const safeNom = (p.nom || '').replace(/'/g, "\\'"); const safePrenom = (p.prenom || '').replace(/'/g, "\\'");
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Profil Client" title="Modifier" onclick="editClientProfile('${safeNom}', '${safePrenom}')">✏️</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Profil Client" title="Supprimer" onclick="deleteClientProfile('${safeNom}', '${safePrenom}')">❌</button>
            `;
        });
    }

    function populateClientSelect() {
        if (!creditorNameSelect) return;
        const previousValue = creditorNameSelect.value;
        creditorNameSelect.innerHTML = '<option value="">-- Choisir Client --</option>';
         const sortedProfiles = [...clientProfilesData].sort((a, b) => { const nc = (a.nom || '').localeCompare(b.nom || ''); return nc !== 0 ? nc : (a.prenom || '').localeCompare(b.prenom || ''); });
        sortedProfiles.forEach(profile => {
            const option = document.createElement('option');
            const fullName = `${profile.nom || ''} ${profile.prenom || ''}`.trim();
            option.value = fullName; option.textContent = fullName + (profile.contact ? ` (${profile.contact})` : '');
            option.dataset.contact = profile.contact || '';
            creditorNameSelect.appendChild(option);
        });
         if (Array.from(creditorNameSelect.options).some(opt => opt.value === previousValue)) { creditorNameSelect.value = previousValue; }
         else { creditorNameSelect.selectedIndex = 0; }
         creditorNameSelect.dispatchEvent(new Event('change'));
    }

    function updateCreditorsTable() {
        if (!creditorsTable) return;
        creditorsTable.innerHTML = '';
        const sortedCreditors = [...creditorsData].sort((a, b) => {
             const aTotal = a.totalAmountDue || 0; const aPaid = a.amountPaidTotal || 0; const aRemaining = aTotal - aPaid;
             const bTotal = b.totalAmountDue || 0; const bPaid = b.amountPaidTotal || 0; const bRemaining = bTotal - bPaid;
            const aSolde = (aRemaining <= 0.005); const bSolde = (bRemaining <= 0.005);
             if (aSolde !== bSolde) return aSolde ? 1 : -1;
            const nameCompare = (a.name || '').localeCompare(b.name || ''); if (nameCompare !== 0) return nameCompare;
            return (a.designation || '').localeCompare(b.designation || '');
        });
        sortedCreditors.forEach((creditor) => {
            const row = creditorsTable.insertRow();
            const totalAmount = creditor.totalAmountDue || 0; const amountPaid = creditor.amountPaidTotal || 0; const remaining = totalAmount - amountPaid; const isSolde = remaining <= 0.005;
            const clientProfile = clientProfilesData.find(p => `${p.nom || ''} ${p.prenom || ''}`.trim() === creditor.name);
            const contactDisplay = clientProfile ? clientProfile.contact : (creditor.contact || '-');
            row.insertCell().textContent = creditor.lastPaymentDate || creditor.date || '-';
            row.insertCell().textContent = creditor.name || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = creditor.designation || '-'; row.cells[row.cells.length-1].classList.add('designation-col');
            const quantityCell = row.insertCell(); quantityCell.textContent = creditor.quantity !== null ? creditor.quantity : '-'; quantityCell.classList.add('quantity-col');
            const unitPriceCell = row.insertCell(); unitPriceCell.textContent = creditor.unitPrice !== null ? formatAmount(creditor.unitPrice) : '-'; unitPriceCell.classList.add('unit-price-col');
            let cellTotal = row.insertCell(); cellTotal.textContent = formatAmount(totalAmount); cellTotal.classList.add('amount-col');
            let cellPaid = row.insertCell(); cellPaid.textContent = formatAmount(amountPaid); cellPaid.classList.add('amount-col');
            let cellRemaining = row.insertCell(); cellRemaining.textContent = formatAmount(remaining); cellRemaining.classList.add('amount-col'); cellRemaining.style.fontWeight = 'bold';
            row.insertCell().textContent = creditor.dueDate || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = contactDisplay; row.cells[row.cells.length-1].classList.add('contact-col');
            const statusCell = row.insertCell(); statusCell.textContent = isSolde ? 'Soldé' : 'En cours'; statusCell.classList.add('status-col');
            row.classList.toggle('solde', isSolde); row.classList.toggle('partiel', !isSolde && amountPaid > 0);
            cellRemaining.style.color = isSolde ? 'var(--color-success)' : (amountPaid > 0 ? 'var(--color-accent)' : 'var(--color-danger)');
             const originalIndex = creditorsData.findIndex(item => item.date === creditor.date && item.name === creditor.name && item.designation === creditor.designation && item.totalAmountDue === creditor.totalAmountDue );
             const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
             actionCell.innerHTML = `
                  <button class="action-btn invoice-btn" aria-label="Imprimer Relevé Crédit" title="Imprimer Relevé" onclick="printCreditReceipt(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>🧾</button>
                  <button class="action-btn delete-btn" aria-label="Supprimer Transaction Crédit" title="Supprimer Transaction" onclick="deleteCreditor(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>❌</button>
             `;
        });
    }

    function updateDebtTable() {
        if (!debtTable) return;
        debtTable.innerHTML = '';
        const statusOrder = { "En cours": 1, "Partiellement Remboursé / Récupéré": 2, "Remboursé / Récupéré": 3, "Annulé": 4 };
        const sortedDebts = [...debtData].sort((a, b) => {
            const statusCompare = (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99); if (statusCompare !== 0) return statusCompare;
            const dateA = a.dueDate ? new Date(a.dueDate) : null; const dateB = b.dueDate ? new Date(b.dueDate) : null;
            const validA = dateA && !isNaN(dateA); const validB = dateB && !isNaN(dateB);
            if (validA && validB) { if (dateA < dateB) return -1; if (dateA > dateB) return 1; }
            else if (validA) { return -1; } else if (validB) { return 1; }
            return (a.name || '').localeCompare(b.name || '');
        });
        sortedDebts.forEach((debt) => {
            const row = debtTable.insertRow();
            row.insertCell().textContent = debt.date || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = debt.type || '-'; row.cells[row.cells.length-1].classList.add('type-col');
            row.insertCell().textContent = debt.name || '-'; row.cells[row.cells.length-1].classList.add('name-col');
            row.insertCell().textContent = debt.description || '-'; row.cells[row.cells.length-1].classList.add('description-col');
            const amountCell = row.insertCell(); amountCell.textContent = formatAmount(debt.amount); amountCell.classList.add('amount-col');
            row.insertCell().textContent = debt.dueDate || '-'; row.cells[row.cells.length-1].classList.add('date-col');
            row.insertCell().textContent = debt.status || '-'; row.cells[row.cells.length-1].classList.add('status-col');
            row.classList.toggle('solde', debt.status === 'Remboursé / Récupéré'); row.classList.toggle('partiel', debt.status === 'Partiellement Remboursé / Récupéré');
             const originalIndex = debtData.findIndex(item => item.date === debt.date && item.type === debt.type && item.name === debt.name && item.description === debt.description && item.amount === debt.amount );
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" aria-label="Modifier Dette/Prêt" title="Modifier" onclick="editDebt(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>✏️</button>
                 <button class="action-btn delete-btn" aria-label="Supprimer Dette/Prêt" title="Supprimer" onclick="deleteDebt(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    /** Updates the HTML table for employee permissions */
    function updateEmployeePermissionsTable() {
        if (!employeePermissionsTable) return;
        employeePermissionsTable.innerHTML = '';
         const sortedPermissions = [...employeePermissionsData].sort((a, b) => (b.requestDate || '').localeCompare(a.requestDate || ''));
        sortedPermissions.forEach((perm) => {
             const originalIndex = employeePermissionsData.findIndex(p => p.requestDate === perm.requestDate && p.name === perm.name && p.permissionDateOrPeriod === perm.permissionDateOrPeriod);
            const row = employeePermissionsTable.insertRow();
            row.insertCell().textContent = perm.requestDate || '-'; row.insertCell().textContent = perm.name || '-';
            row.insertCell().textContent = perm.permissionDateOrPeriod || '-';
            const reasonCell = row.insertCell(); reasonCell.textContent = perm.reason || '-'; reasonCell.classList.add('reason-col');
            const statusCell = row.insertCell(); statusCell.textContent = perm.status || 'En attente'; statusCell.classList.add('status-col');
            statusCell.style.fontWeight = 'bold';
            switch (perm.status) {
                case 'Accordé': statusCell.style.color = 'var(--color-success)'; break;
                case 'Refusé': statusCell.style.color = 'var(--color-danger)'; break;
                default: statusCell.style.color = 'var(--color-accent)'; break;
            }
            const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `
                <button class="action-btn pay-btn" aria-label="Accorder Permission" title="Accorder" onclick="updatePermissionStatus('employee', ${originalIndex}, 'Accordé')" ${originalIndex === -1 || perm.status === 'Accordé' ? 'disabled' : ''}>✔️</button>
                <button class="action-btn delete-btn" aria-label="Refuser Permission" title="Refuser" onclick="updatePermissionStatus('employee', ${originalIndex}, 'Refusé')" ${originalIndex === -1 || perm.status === 'Refusé' ? 'disabled' : ''}>❌</button>
                <button class="action-btn delete-btn" style="color: var(--color-secondary);" aria-label="Supprimer Demande" title="Supprimer" onclick="deletePermission('employee', ${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>🗑️</button>
            `;
        });
    }

    /** Updates the HTML table for learner permissions */
    function updateLearnerPermissionsTable() {
         if (!learnerPermissionsTable) return;
         learnerPermissionsTable.innerHTML = '';
          const sortedPermissions = [...learnerPermissionsData].sort((a, b) => (b.requestDate || '').localeCompare(a.requestDate || ''));
         sortedPermissions.forEach((perm) => {
              const originalIndex = learnerPermissionsData.findIndex(p => p.requestDate === perm.requestDate && p.name === perm.name && p.permissionDateOrPeriod === perm.permissionDateOrPeriod);
             const row = learnerPermissionsTable.insertRow();
             row.insertCell().textContent = perm.requestDate || '-'; row.insertCell().textContent = perm.name || '-';
             row.insertCell().textContent = perm.permissionDateOrPeriod || '-';
             const reasonCell = row.insertCell(); reasonCell.textContent = perm.reason || '-'; reasonCell.classList.add('reason-col');
             const statusCell = row.insertCell(); statusCell.textContent = perm.status || 'En attente'; statusCell.classList.add('status-col');
             statusCell.style.fontWeight = 'bold';
             switch (perm.status) {
                 case 'Accordé': statusCell.style.color = 'var(--color-success)'; break;
                 case 'Refusé': statusCell.style.color = 'var(--color-danger)'; break;
                 default: statusCell.style.color = 'var(--color-accent)'; break;
             }
             const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
             actionCell.innerHTML = `
                <button class="action-btn pay-btn" aria-label="Accorder Permission" title="Accorder" onclick="updatePermissionStatus('learner', ${originalIndex}, 'Accordé')" ${originalIndex === -1 || perm.status === 'Accordé' ? 'disabled' : ''}>✔️</button>
                <button class="action-btn delete-btn" aria-label="Refuser Permission" title="Refuser" onclick="updatePermissionStatus('learner', ${originalIndex}, 'Refusé')" ${originalIndex === -1 || perm.status === 'Refusé' ? 'disabled' : ''}>❌</button>
                <button class="action-btn delete-btn" style="color: var(--color-secondary);" aria-label="Supprimer Demande" title="Supprimer" onclick="deletePermission('learner', ${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>🗑️</button>
            `;
         });
    }

    /** Initialise l'application. */
    function initializeApp() {
        console.log("Initialisation de l'application...");
        setTodaysDate();
        updateStockTable(); // Calculates stockData and updates product dropdowns
        updateSupplyTable(); updateSalesTable(); updateMaterielElectriqueTable();
        updateExpensesTable(); updateOthersTable(); updateEmployeesTable();
        updateLearnersTable(); populateEmployeeSelectForPermission(); populateLearnerSelectForPermission();
        updateEmployeePermissionsTable(); updateLearnerPermissionsTable();
        updateMobileMoneyTable(); updateMmFournisseursTable(); updateClientProfilesTable();
        populateClientSelect(); updateCreditorsTable(); updateDebtTable();
        handleOperationTypeChange(); // Set initial visibility of sales sub-forms

        const allSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection, invoiceGeneratorSection].filter(Boolean);
        allSections.forEach(section => { if(section) section.classList.add('hidden'); });

        const allDetailContainers = [
            supplyListContainer, stockDetailsContainer, salesDetailsContainer, materielElectriqueDetailsContainer,
            expensesDetailsContainer, othersDetailsContainer, employeesDetailsContainer, learnersDetailsContainer,
            employeePermissionsContainer, learnerPermissionsContainer, mobileMoneyDetailsContainer, mmFournisseursDetailsContainer,
            clientProfilesContainer, creditorsDetailsContainer, debtDetailsContainer,
            reportDetailsContainer, reportFilters, showReportDetailsButton,
            document.getElementById('invoice-print-area')
        ].filter(Boolean);
        allDetailContainers.forEach(container => container.classList.add('hidden'));

        // Initialize invoice form state (e.g., first row, total calculation)
        initializeInvoiceForm();

        console.log("Initialisation terminée.");
    }


    // --- Gestionnaires d'événements pour la soumission des formulaires ---
    if(supplyForm) supplyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = supplyEditIndexInput ? parseInt(supplyEditIndexInput.value, 10) : -1;
        if (!supplyDateInput || !supplyTypeSelect || !supplyDesignationInput || !supplyQuantityInput || !supplyUnitPriceInput || !supplyTotalAmountInput) { alert("Erreur interne: Champs appro. manquants."); return; }
        const date = supplyDateInput.value; const type = supplyTypeSelect.value; const designation = supplyDesignationInput.value.trim();
        const quantity = parseFloat(supplyQuantityInput.value); const unitPrice = parseFloat(supplyUnitPriceInput.value); const totalAmount = parseFloat(supplyTotalAmountInput.value);
        if (!date || !type || !designation || isNaN(quantity) || quantity <= 0 || isNaN(unitPrice) || unitPrice < 0 || isNaN(totalAmount)) { alert("Veuillez remplir correctement tous les champs d'approvisionnement."); return; }
        const isStockableType = (type === 'Papeterie' || type === 'Matériels électrique'); let originalStockableStatus = false; let requiresStockUpdate = false;
        if (isStockableType) {
            const conflictingItem = supplyData.find((item, index) => item.designation === designation && item.type !== type && (item.type === 'Papeterie' || item.type === 'Matériels électrique') && index !== editIndex);
            if (conflictingItem) { alert(`Attention : Désignation "${designation}" existe déjà pour le type stockable "${conflictingItem.type}".`); return; }
        }
        const newData = { date, type, designation, quantity, unitPrice, totalAmount };
        if (editIndex > -1 && editIndex < supplyData.length) {
            const originalItem = supplyData[editIndex]; originalStockableStatus = originalItem.type === 'Papeterie' || originalItem.type === 'Matériels électrique';
            requiresStockUpdate = (isStockableType || originalStockableStatus) && (originalItem.designation !== designation || originalItem.type !== type || originalItem.quantity !== quantity);
            supplyData[editIndex] = newData; alert('Approvisionnement mis à jour.');
        } else { supplyData.push(newData); alert('Approvisionnement ajouté.'); requiresStockUpdate = isStockableType; }
        localStorage.setItem('supplyData', JSON.stringify(supplyData)); updateSupplyTable();
        if (requiresStockUpdate) { updateStockTable(); } supplyForm.reset(); setTodaysDate();
        if(supplyEditIndexInput) supplyEditIndexInput.value = ''; supplyForm.querySelector('button[type="submit"]').textContent = 'Ajouter Approvisionnement';
    });

    if(salesForm) salesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!saleDateInput?.value) { alert("La date est requise."); return; }
        const date = saleDateInput.value; const operationType = operationTypeSelect.value;
        let dataUpdated = false; let needsStockUpdate = false;
        try {
            if (operationType === 'Papeterie') {
                const designation = saleDesignationSelect.value; if (!designation) throw new Error("Sélectionnez une désignation Papeterie.");
                const quantity = parseFloat(saleQuantityInput.value) || 0; if (quantity <= 0) throw new Error("Quantité > 0 requise.");
                const unitPrice = parseFloat(saleUnitPriceInput.value) || 0; if (unitPrice < 0) throw new Error("Prix unitaire >= 0 requis.");
                const totalAmount = parseFloat(saleTotalAmountInput.value) || (quantity * unitPrice);
                const currentStockItem = stockData.find(item => item.designation === designation && item.type === 'Papeterie');
                const availableStock = currentStockItem ? currentStockItem.remainingQuantity : 0;
                if (quantity > availableStock) { if (!confirm(`Stock insuffisant pour ${designation} (Papeterie). Dispo: ${availableStock}. Vendre quand même ?`)) throw new Error(`Vente annulée.`); console.warn(`Vente ${quantity} ${designation} (Papeterie) malgré stock (${availableStock}) insuffisant.`); }
                salesData.push({ date, type: 'Papeterie', designation, quantity, unitPrice, totalAmount }); updateSalesTable(); dataUpdated = true; needsStockUpdate = true;
            } else if (operationType === 'Matériels électrique') {
                const designation = meDesignationSelect.value; if (!designation) throw new Error("Sélectionnez une désignation Mat. Électrique.");
                const quantity = parseFloat(meQuantityInput.value) || 0; if (quantity <= 0) throw new Error("Quantité > 0 requise.");
                const unitPrice = parseFloat(meUnitPriceInput.value) || 0; if (unitPrice < 0) throw new Error("Prix unitaire >= 0 requis.");
                const totalAmount = parseFloat(meTotalAmountInput.value) || (quantity * unitPrice);
                 const currentStockItem = stockData.find(item => item.designation === designation && item.type === 'Matériels électrique');
                 const availableStock = currentStockItem ? currentStockItem.remainingQuantity : 0;
                 if (quantity > availableStock) { if (!confirm(`Stock insuffisant pour ${designation} (Mat. Élec.). Dispo: ${availableStock}. Vendre quand même ?`)) throw new Error(`Vente annulée.`); console.warn(`Vente ${quantity} ${designation} (Mat. Élec.) malgré stock (${availableStock}) insuffisant.`); }
                materielElectriqueData.push({ date, type: 'Matériels électrique', designation, quantity, unitPrice, totalAmount }); updateMaterielElectriqueTable(); dataUpdated = true; needsStockUpdate = true;
            } else if (operationType === 'Dépenses') {
                const reason = expenseReasonInput.value.trim(); if (!reason) throw new Error("Motif dépense requis.");
                const amount = parseFloat(expenseAmountInput.value) || 0; if (amount <= 0) throw new Error("Montant dépense > 0 requis.");
                expensesData.push({ date, reason, amount }); updateExpensesTable(); dataUpdated = true;
            } else if (operationType === 'Divers') {
                const designation = otherDesignationInput.value.trim(); if (!designation) throw new Error("Désignation/Motif requis pour Divers.");
                const quantity = parseFloat(otherQuantityInput.value); const unitPriceOrAmount = parseFloat(otherUnitPriceInput.value) || 0; if (unitPriceOrAmount <= 0) throw new Error("Montant/Prix > 0 requis.");
                const totalAmount = parseFloat(otherTotalAmountInput.value) || unitPriceOrAmount; let finalQuantity, finalUnitPrice;
                 if (isNaN(quantity) || quantity === 0 || quantity === 1) { finalQuantity = 1; finalUnitPrice = totalAmount; } else { finalQuantity = quantity; finalUnitPrice = unitPriceOrAmount; }
                othersData.push({ date, type: 'Divers', designation, quantity: finalQuantity, unitPrice: finalUnitPrice, totalAmount }); updateOthersTable(); dataUpdated = true;
            } else { throw new Error("Type d'opération inconnu."); }
            if (dataUpdated) {
                localStorage.setItem('salesData', JSON.stringify(salesData)); localStorage.setItem('materielElectriqueData', JSON.stringify(materielElectriqueData));
                localStorage.setItem('expensesData', JSON.stringify(expensesData)); localStorage.setItem('othersData', JSON.stringify(othersData));
                salesForm.reset(); setTodaysDate(); handleOperationTypeChange(); if (needsStockUpdate) { updateStockTable(); }
            }
        } catch (error) { alert(`Erreur ajout opération: ${error.message}`); }
    });

    if(employeeForm) employeeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = employeeEditIndexInput ? parseInt(employeeEditIndexInput.value, 10) : -1;
        if (!employeeNomInput) { alert("Erreur interne: Champ nom employé manquant."); return; }
        const nom = employeeNomInput.value.trim(); if (!nom) { alert("Nom employé requis."); return; }
        const salaryValue = employeeSalaryInput ? parseFloat(employeeSalaryInput.value) : null;
        const paidAmountValue = employeePaidAmountInput ? parseFloat(employeePaidAmountInput.value) : 0;
        if (salaryValue !== null && (isNaN(salaryValue) || salaryValue < 0)) { alert("Le salaire doit être positif ou vide."); return; }
        if (isNaN(paidAmountValue) || paidAmountValue < 0) { alert("Montant payé doit être positif ou zéro."); return; }
        const employeeData = {
            nom, prenom: employeePrenomInput?.value.trim() || '', statut: employeeRoleInput?.value.trim() || '', adresse: employeeAdresseInput?.value.trim() || '', telephone: employeeTelephoneInput?.value.trim() || '', lieuResidence: employeeLieuResidenceInput?.value.trim() || '', joursTravail: employeeJoursTravailInput?.value.trim() || '', heureArrivee: employeeHeureArriveeInput?.value || '', heureDepart: employeeHeureDepartInput?.value || '', salary: salaryValue, paidAmount: paidAmountValue, hireDate: employeeHireDateInput?.value || '', contactPersonNom: employeeContactPersonNomInput?.value.trim() || '', contactPersonPrenom: employeeContactPersonPrenomInput?.value.trim() || '', contactPersonAdresse: employeeContactPersonAdresseInput?.value.trim() || '', contactPersonTelephone: employeeContactPersonTelephoneInput?.value.trim() || '', contactPersonLieuResidence: employeeContactPersonLieuResidenceInput?.value.trim() || ''
        };
        if (editIndex > -1 && editIndex < employeesData.length) { employeesData[editIndex] = employeeData; alert('Employé mis à jour.'); }
        else { employeesData.push(employeeData); alert('Employé ajouté.'); }
        localStorage.setItem('employeesData', JSON.stringify(employeesData));
        updateEmployeesTable(); populateEmployeeSelectForPermission(); // Update permission select
        employeeForm.reset(); setTodaysDate(); if(employeeEditIndexInput) employeeEditIndexInput.value = '';
        employeeForm.querySelector('button[type="submit"]').textContent = 'Ajouter Employé';
    });

     if(learnerForm) learnerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = learnerEditIndexInput ? parseInt(learnerEditIndexInput.value, 10) : -1;
        if (!learnerNomInput || !learnerFiliereInput) { alert("Erreur interne: Champs apprenant manquants."); return; }
        const nom = learnerNomInput.value.trim(); const filiere = learnerFiliereInput.value.trim(); if (!nom || !filiere) { alert("Nom et filière requis."); return; }
        const ageValue = learnerAgeInput ? parseInt(learnerAgeInput.value) : null; const fraisDocsValue = learnerFraisDocumentsInput ? parseFloat(learnerFraisDocumentsInput.value) : 0;
        const tranche1Value = learnerTranche1Input ? parseFloat(learnerTranche1Input.value) : 0; const tranche2Value = learnerTranche2Input ? parseFloat(learnerTranche2Input.value) : 0;
        const tranche3Value = learnerTranche3Input ? parseFloat(learnerTranche3Input.value) : 0; const tranche4Value = learnerTranche4Input ? parseFloat(learnerTranche4Input.value) : 0;
         if (ageValue !== null && (isNaN(ageValue) || ageValue < 0)) { alert("L'âge doit être positif."); return; }
         if (isNaN(fraisDocsValue) || fraisDocsValue < 0 || isNaN(tranche1Value) || tranche1Value < 0 || isNaN(tranche2Value) || tranche2Value < 0 || isNaN(tranche3Value) || tranche3Value < 0 || isNaN(tranche4Value) || tranche4Value < 0) { alert("Frais et tranches doivent être positifs ou zéro."); return; }
        const learnerData = {
            nom, prenom: learnerPrenomInput?.value.trim() || '', age: ageValue, adresse: learnerAdresseInput?.value.trim() || '', lieuResidence: learnerLieuResidenceInput?.value.trim() || '', niveauEtudes: learnerNiveauEtudesInput?.value.trim() || '', situationMatrimoniale: learnerSituationMatrimonialeSelect?.value || '', pereNom: learnerPereNomInput?.value.trim() || '', perePrenom: learnerPerePrenomInput?.value.trim() || '', mereNom: learnerMereNomInput?.value.trim() || '', merePrenom: learnerMerePrenomInput?.value.trim() || '', filiere, dureeFormation: learnerDureeFormationInput?.value.trim() || '', fraisDocuments: fraisDocsValue, tranche1: tranche1Value, tranche2: tranche2Value, tranche3: tranche3Value, tranche4: tranche4Value, garantNom: learnerGarantNomInput?.value.trim() || '', garantPrenom: learnerGarantPrenomInput?.value.trim() || '', garantTelephone: learnerGarantTelephoneInput?.value.trim() || '', garantAdresse: learnerGarantAdresseInput?.value.trim() || ''
        };
         if (editIndex > -1 && editIndex < learnersData.length) { learnersData[editIndex] = learnerData; alert('Apprenant mis à jour.'); }
         else { learnersData.push(learnerData); alert('Apprenant ajouté.'); }
        localStorage.setItem('learnersData', JSON.stringify(learnersData));
        updateLearnersTable(); populateLearnerSelectForPermission(); // Update permission select
        learnerForm.reset(); if(learnerEditIndexInput) learnerEditIndexInput.value = '';
        learnerForm.querySelector('button[type="submit"]').textContent = 'Ajouter Apprenant';
    });

     if(mobileMoneyForm) mobileMoneyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = mobileMoneyEditIndexInput ? parseInt(mobileMoneyEditIndexInput.value, 10) : -1;
        if (!mmDateInput || !mmAgentInput) { alert("Erreur interne: Champs Point MM manquants."); return; }
        const date = mmDateInput.value; const agent = mmAgentInput.value.trim(); if (!date || !agent) { alert("Date et Agent requis pour Point MM."); return; }
        const balanceMoov = parseFloat(mmBalanceMoovInput?.value) || 0; const balanceMTN = parseFloat(mmBalanceMtnInput?.value) || 0; const balanceCelttis = parseFloat(mmBalanceCelttisInput?.value) || 0; const balanceCash = parseFloat(mmBalanceCashInput?.value) || 0; const creditMoov = parseFloat(mmCreditMoovInput?.value) || 0; const creditMTN = parseFloat(mmCreditMtnInput?.value) || 0; const creditCelttis = parseFloat(mmCreditCelttisInput?.value) || 0; const perteTransfert = parseFloat(mmPerteTransfertInput?.value) || 0; const perteCredit = parseFloat(mmPerteCreditInput?.value) || 0;
        if (balanceMoov < 0 || balanceMTN < 0 || balanceCelttis < 0 || balanceCash < 0 || creditMoov < 0 || creditMTN < 0 || creditCelttis < 0 || perteTransfert < 0 || perteCredit < 0) { alert("Soldes, crédits, pertes MM ne peuvent pas être négatifs."); return; }
        const transactionData = { date, agent, balanceMoov, balanceMTN, balanceCelttis, balanceCash, creditMoov, creditMTN, creditCelttis, perteTransfert, perteCredit };
        if (editIndex > -1 && editIndex < mobileMoneyData.length) {
             const existingEntryIndex = mobileMoneyData.findIndex((item, idx) => item.date === date && item.agent === agent && idx !== editIndex);
             if (existingEntryIndex > -1) { alert(`Autre point existe déjà pour ${agent} à la date ${date}.`); return; }
            mobileMoneyData[editIndex] = transactionData; alert('Point Mobile Money mis à jour.');
        } else {
            const existingEntryIndex = mobileMoneyData.findIndex(item => item.date === date && item.agent === agent);
            if (existingEntryIndex > -1) { alert(`Point existe déjà pour ${agent} à la date ${date}. Modifiez l'existant.`); return; }
            mobileMoneyData.push(transactionData); alert('Point Mobile Money ajouté.');
        }
        localStorage.setItem('mobileMoneyData', JSON.stringify(mobileMoneyData));
        updateMobileMoneyTable(); mobileMoneyForm.reset(); setTodaysDate(); if(mobileMoneyEditIndexInput) mobileMoneyEditIndexInput.value = '';
        mobileMoneyForm.querySelector('button[type="submit"]').textContent = 'Ajouter Point Journalier';
    });

    if(mmFournisseurForm) mmFournisseurForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editKey = mmFournisseurEditKeyInput?.value || ''; const nom = mmFournisseurNomInput?.value.trim(); const prenom = mmFournisseurPrenomInput?.value.trim();
        const contact = mmFournisseurContactInput?.value.trim(); const montantFourni = parseFloat(mmFournisseurMontantInput?.value); const interet = parseFloat(mmFournisseurInteretInput?.value); const creditVendu = parseFloat(mmFournisseurVenduInput?.value) || 0;
        if (!nom) { alert("Nom fournisseur MM requis."); return; } if (isNaN(montantFourni) || montantFourni < 0) { alert("Montant Fourni doit être positif."); return; }
        if (creditVendu < 0) { alert("Crédit Vendu ne peut être négatif."); return; } if (!isNaN(interet) && interet < 0) { alert("Intérêt ne peut être négatif."); return; }
        const fournisseurData = { nom, prenom, contact, montantFourni, interet: !isNaN(interet) ? interet : null, creditVendu };
        let existingIndex = -1; let isNameChangeDuringEdit = false;
        if(editKey) {
            const [editNom, editPrenom] = editKey.split('_'); existingIndex = mmFournisseursData.findIndex(f => f.nom === editNom && f.prenom === editPrenom);
             if (existingIndex > -1 && (nom !== editNom || prenom !== editPrenom)) { isNameChangeDuringEdit = true; }
        } else { existingIndex = mmFournisseursData.findIndex(f => f.nom === nom && f.prenom === prenom); if (existingIndex > -1) { alert(`Fournisseur ${nom} ${prenom} existe déjà. Modifiez via tableau.`); return; } }
        if (isNameChangeDuringEdit) {
            const duplicateCheck = mmFournisseursData.findIndex(f => f.nom === nom && f.prenom === prenom);
            if (duplicateCheck > -1) { alert(`Impossible renommer : fournisseur ${nom} ${prenom} existe déjà.`); const [origN, origP] = editKey.split('_'); mmFournisseurNomInput.value = origN; mmFournisseurPrenomInput.value = origP; return; }
            const [editN, editP] = editKey.split('_'); mmFournisseursData = mmFournisseursData.filter(f => !(f.nom === editN && f.prenom === editP)); mmFournisseursData.push(fournisseurData); alert(`Fournisseur renommé/ajouté : ${nom} ${prenom} (ancienne entrée supprimée).`);
        } else if (existingIndex > -1) { mmFournisseursData[existingIndex] = fournisseurData; alert(`Fournisseur ${nom} ${prenom} mis à jour.`); }
        else { mmFournisseursData.push(fournisseurData); alert(`Fournisseur ${nom} ${prenom} ajouté.`); }
        localStorage.setItem('mmFournisseursData', JSON.stringify(mmFournisseursData));
        updateMmFournisseursTable(); mmFournisseurForm.reset(); if(mmFournisseurEditKeyInput) mmFournisseurEditKeyInput.value = '';
        mmFournisseurForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Fournisseur';
    });

    if(clientProfileForm) clientProfileForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editKey = clientProfileEditKeyInput?.value || ''; const nom = clientProfileNomInput?.value.trim(); const prenom = clientProfilePrenomInput?.value.trim();
        const adresse = clientProfileAdresseInput?.value.trim(); const contact = clientProfileContactInput?.value.trim(); const statut = clientProfileStatutInput?.value.trim();
        if (!nom) { alert("Nom client requis pour profil."); return; }
        const profileData = { nom, prenom, adresse, contact, statut }; let existingIndex = -1; let isNameChangeDuringEdit = false;
         if(editKey) {
             const [editNom, editPrenom] = editKey.split('_'); existingIndex = clientProfilesData.findIndex(p => p.nom === editNom && p.prenom === editPrenom);
              if (existingIndex > -1 && (nom !== editNom || prenom !== editPrenom)) { isNameChangeDuringEdit = true; }
         } else { existingIndex = clientProfilesData.findIndex(p => p.nom === nom && p.prenom === prenom); if (existingIndex > -1) { alert(`Profil ${nom} ${prenom} existe déjà. Modifiez via tableau.`); return; } }
         if (isNameChangeDuringEdit) {
             const duplicateCheck = clientProfilesData.findIndex(p => p.nom === nom && p.prenom === prenom);
             if (duplicateCheck > -1) { alert(`Impossible renommer : profil ${nom} ${prenom} existe déjà.`); const [origN, origP] = editKey.split('_'); clientProfileNomInput.value = origN; clientProfilePrenomInput.value = origP; return; }
             const [origN, origP] = editKey.split('_'); const originalFullName = `${origN} ${origP}`.trim(); const newFullName = `${nom} ${prenom}`.trim(); let creditorsUpdated = false;
             creditorsData.forEach(cred => { if (cred.name === originalFullName) { cred.name = newFullName; creditorsUpdated = true; } });
             clientProfilesData = clientProfilesData.filter(p => !(p.nom === origN && p.prenom === origP)); clientProfilesData.push(profileData); alert(`Profil client renommé en ${nom} ${prenom}. Transactions crédit associées mises à jour.`);
             if (creditorsUpdated) { localStorage.setItem('creditorsData', JSON.stringify(creditorsData)); updateCreditorsTable(); }
         } else if (existingIndex > -1) { clientProfilesData[existingIndex] = profileData; alert(`Profil client ${nom} ${prenom} mis à jour.`); }
         else { clientProfilesData.push(profileData); alert(`Profil client ${nom} ${prenom} ajouté.`); }
         localStorage.setItem('clientProfilesData', JSON.stringify(clientProfilesData));
         updateClientProfilesTable(); populateClientSelect(); clientProfileForm.reset(); if(clientProfileEditKeyInput) clientProfileEditKeyInput.value = '';
         clientProfileForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Profil';
    });

     if(creditorForm) creditorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!creditorDateInput || !creditorNameSelect || !creditorDesignationInput || !creditorAmountPaidInput) { alert("Erreur interne: Champs Transaction Crédit manquants."); return; }
        const date = creditorDateInput.value; const name = creditorNameSelect.value; const designation = creditorDesignationInput.value.trim();
        const quantity = creditorQuantityInput?.value ? (parseFloat(creditorQuantityInput.value) || null) : null;
        const unitPrice = creditorUnitPriceInput?.value ? (parseFloat(creditorUnitPriceInput.value) || null) : null;
        const totalAmountDueEntered = parseFloat(creditorTotalAmountDueInput.value); const amountPaidNow = parseFloat(creditorAmountPaidInput.value); const dueDate = creditorDueDateInput?.value || '';
        if (!date || !name || !designation) { alert("Date, Client et Désignation requis."); return; } if (isNaN(amountPaidNow) || amountPaidNow < 0) { alert("Montant Payé doit être positif ou zéro."); return; }
        const existingCreditorIndex = creditorsData.findIndex(c => c.name === name && c.designation === designation && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) > 0.005) );
        try {
            if (existingCreditorIndex > -1) {
                const existingCreditor = creditorsData[existingCreditorIndex]; const currentRemaining = (existingCreditor.totalAmountDue || 0) - (existingCreditor.amountPaidTotal || 0);
                 if (!isNaN(totalAmountDueEntered) && totalAmountDueEntered > 0 && totalAmountDueEntered !== existingCreditor.totalAmountDue) console.warn(`Montant Total Dû entré ignoré pour paiement ${name}-${designation}, crédit existant utilisé.`);
                 if (amountPaidNow > currentRemaining + 0.005) throw new Error(`Paiement (${formatAmount(amountPaidNow)}) dépasse solde restant (${formatAmount(currentRemaining)}).`);
                 existingCreditor.amountPaidTotal = (existingCreditor.amountPaidTotal || 0) + amountPaidNow; existingCreditor.lastPaymentDate = date;
                 if (dueDate && dueDate !== existingCreditor.dueDate) existingCreditor.dueDate = dueDate;
                 alert(`Paiement de ${formatAmount(amountPaidNow)} enregistré pour ${name} - ${designation}.\nNouveau solde: ${formatAmount(existingCreditor.totalAmountDue - existingCreditor.amountPaidTotal)}`);
            } else {
                 if (isNaN(totalAmountDueEntered) || totalAmountDueEntered <= 0) {
                     if (quantity !== null && unitPrice !== null && quantity > 0 && unitPrice >= 0) {
                         creditorTotalAmountDueInput.value = formatAmount(quantity * unitPrice); const calculatedTotal = parseFloat(creditorTotalAmountDueInput.value);
                          if (isNaN(calculatedTotal) || calculatedTotal <= 0) throw new Error("Montant Total Dû requis > 0 pour nouvelle transaction (ou calculable).");
                            const finalTotalDue = calculatedTotal; if (amountPaidNow > finalTotalDue + 0.005) throw new Error(`Montant Payé (${formatAmount(amountPaidNow)}) > Total Dû (${formatAmount(finalTotalDue)}).`);
                            addNewCreditTransaction(date, name, designation, quantity, unitPrice, finalTotalDue, amountPaidNow, dueDate);
                     } else { throw new Error("Montant Total Dû requis > 0 pour nouvelle transaction (ou calculable)."); }
                 } else {
                    const finalTotalDue = totalAmountDueEntered;
                     if (quantity !== null && unitPrice !== null && quantity > 0 && unitPrice >= 0) {
                         const calculatedTotal = quantity * unitPrice; if (Math.abs(calculatedTotal - finalTotalDue) > 0.01) { if (!confirm(`Total Dû entré (${formatAmount(finalTotalDue)}) != calcul Qté*PU (${formatAmount(calculatedTotal)}). Continuer avec ${formatAmount(finalTotalDue)} ?`)) return; }
                     }
                     if (amountPaidNow > finalTotalDue + 0.005) throw new Error(`Montant Payé (${formatAmount(amountPaidNow)}) > Total Dû (${formatAmount(finalTotalDue)}).`);
                     addNewCreditTransaction(date, name, designation, quantity, unitPrice, finalTotalDue, amountPaidNow, dueDate);
                 }
            }
            localStorage.setItem('creditorsData', JSON.stringify(creditorsData)); updateCreditorsTable(); creditorForm.reset(); populateClientSelect(); setTodaysDate();
        } catch (error) { alert(`Erreur Gestion Crédit Client : ${error.message}`); }
    });

    function addNewCreditTransaction(date, name, designation, quantity, unitPrice, totalAmountDue, amountPaidNow, dueDate) {
         const soldCreditorExists = creditorsData.some(c => c.name === name && c.designation === designation && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) <= 0.005));
         if (soldCreditorExists) { if (!confirm(`Crédit similaire soldé existe pour ${name} - ${designation}. Créer NOUVELLE transaction ?`)) return; }
        const newCreditor = { date, name, designation, quantity, unitPrice, totalAmountDue, amountPaidTotal: amountPaidNow, lastPaymentDate: date, dueDate: dueDate || null };
        creditorsData.push(newCreditor);
        alert(`Nouveau crédit créé pour ${name} - ${designation}.\nDû: ${formatAmount(totalAmountDue)}, Payé: ${formatAmount(amountPaidNow)}, Restant: ${formatAmount(totalAmountDue - amountPaidNow)}`);
    }

     if(debtForm) debtForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = debtEditIndexInput ? parseInt(debtEditIndexInput.value, 10) : -1;
        if (!debtDateInput || !debtTypeSelect || !debtNameInput || !debtDescriptionInput || !debtAmountInput || !debtStatusSelect) { alert("Erreur interne: Champs Dette/Prêt manquants."); return; }
        const date = debtDateInput.value; const type = debtTypeSelect.value; const name = debtNameInput.value.trim();
        const description = debtDescriptionInput.value.trim(); const amount = parseFloat(debtAmountInput.value); const dueDate = debtDueDateInput?.value || ''; const status = debtStatusSelect.value;
        if (!date || !type || !name || !description || isNaN(amount) || amount <= 0 || !status) { alert("Veuillez remplir correctement tous les champs Dette/Prêt."); return; }
        const debtItemData = { date, type, name, description, amount, dueDate, status };
         if (editIndex > -1 && editIndex < debtData.length) { debtData[editIndex] = debtItemData; alert('Dette/Prêt mis à jour.'); }
         else { const isDuplicate = debtData.some(d => d.date === date && d.type === type && d.name === name && d.description === description && d.amount === amount); if (isDuplicate) { if (!confirm("Entrée similaire existe déjà. Ajouter quand même ?")) return; } debtData.push(debtItemData); alert('Dette/Prêt ajouté.'); }
        localStorage.setItem('debtData', JSON.stringify(debtData)); updateDebtTable(); debtForm.reset(); setTodaysDate();
        if(debtEditIndexInput) debtEditIndexInput.value = ''; debtForm.querySelector('button[type="submit"]').textContent = 'Ajouter Dette/Prêt';
    });

    if(permissionEmployeeForm) permissionEmployeeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const requestDate = permEmpReqDateInput?.value; const name = permEmpNameSelect?.value;
        const permissionDateOrPeriod = permEmpDateInput?.value.trim(); const reason = permEmpReasonTextarea?.value.trim();
        if (!requestDate || !name || !permissionDateOrPeriod || !reason) { alert("Veuillez remplir tous les champs pour la demande de permission."); return; }
        const newPermission = { requestDate, name, permissionDateOrPeriod, reason, status: 'En attente' };
        employeePermissionsData.push(newPermission); localStorage.setItem('employeePermissionsData', JSON.stringify(employeePermissionsData));
        updateEmployeePermissionsTable(); alert(`Demande de permission ajoutée pour ${name}.`); permissionEmployeeForm.reset();
        setTodaysDate(); populateEmployeeSelectForPermission();
    });

    if(permissionLearnerForm) permissionLearnerForm.addEventListener('submit', function (event) {
         event.preventDefault();
         const requestDate = permLrnReqDateInput?.value; const name = permLrnNameSelect?.value;
         const permissionDateOrPeriod = permLrnDateInput?.value.trim(); const reason = permLrnReasonTextarea?.value.trim();
         if (!requestDate || !name || !permissionDateOrPeriod || !reason) { alert("Veuillez remplir tous les champs pour la demande de permission."); return; }
         const newPermission = { requestDate, name, permissionDateOrPeriod, reason, status: 'En attente' };
         learnerPermissionsData.push(newPermission); localStorage.setItem('learnerPermissionsData', JSON.stringify(learnerPermissionsData));
         updateLearnerPermissionsTable(); alert(`Demande de permission ajoutée pour ${name}.`); permissionLearnerForm.reset();
         setTodaysDate(); populateLearnerSelectForPermission();
    });


    // --- Gestionnaires d'événements pour afficher/masquer les détails ---
    const addToggleListener = (button, container) => { if(button && container) button.addEventListener('click', () => toggleVisibility(container)); };
    addToggleListener(showSupplyListButton, supplyListContainer); addToggleListener(showStockDetailsButton, stockDetailsContainer);
    addToggleListener(showEmployeesDetailsButton, employeesDetailsContainer); addToggleListener(showLearnersDetailsButton, learnersDetailsContainer);
    addToggleListener(showMobileMoneyDetailsButton, mobileMoneyDetailsContainer); addToggleListener(showMmFournisseursDetailsButton, mmFournisseursDetailsContainer);
    addToggleListener(showClientProfilesButton, clientProfilesContainer); addToggleListener(showCreditorsDetailsButton, creditorsDetailsContainer);
    addToggleListener(showDebtDetailsButton, debtDetailsContainer); addToggleListener(showReportDetailsButton, reportDetailsContainer);
    addToggleListener(showEmployeePermissionsButton, employeePermissionsContainer); addToggleListener(showLearnerPermissionsButton, learnerPermissionsContainer);
    // Special toggles for sales subsections
    if(showSalesDetailsButton) showSalesDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(salesDetailsContainer));
    if(showMaterielElectriqueDetailsButton) showMaterielElectriqueDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(materielElectriqueDetailsContainer));
    if(showExpensesDetailsButton) showExpensesDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(expensesDetailsContainer));
    if(showOthersDetailsButton) showOthersDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(othersDetailsContainer));

    // --- Gestionnaires d'événements pour la visibilité des sections principales ---
    const allMainSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection, invoiceGeneratorSection].filter(Boolean);
    const addSectionToggleListener = (button, sectionToShow) => { if (button) button.addEventListener('click', () => setSectionVisibility(sectionToShow, allMainSections.filter(s => s !== sectionToShow))); };
    addSectionToggleListener(showSupplySectionButton, supplySection); addSectionToggleListener(showSalesSectionButton, salesSection);
    addSectionToggleListener(showEmployeesSectionButton, employeesSection); addSectionToggleListener(showLearnersSectionButton, learnersSection);
    addSectionToggleListener(showMobileMoneySectionButton, mobileMoneySection); addSectionToggleListener(showCreditorsSectionButton, creditorsSection);
    addSectionToggleListener(showDebtSectionButton, debtSection);
    if(showReportSectionButton) showReportSectionButton.addEventListener('click', () => {
        setSectionVisibility(reportSection, allMainSections.filter(s => s !== reportSection));
        if (reportFilters) reportFilters.classList.add('hidden'); if (reportDetailsContainer) reportDetailsContainer.classList.add('hidden');
        if (showReportDetailsButton) showReportDetailsButton.classList.add('hidden');
    });
    // Invoice Generator Toggle
     if (generateInvoiceButton && invoiceGeneratorSection) {
        generateInvoiceButton.addEventListener('click', () => {
             setSectionVisibility(invoiceGeneratorSection, allMainSections.filter(s => s !== invoiceGeneratorSection));
             initializeInvoiceForm(); // Initialize form state and calculations
             invoiceGeneratorSection.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Gestionnaires pour les calculs automatiques ---
    if(supplyQuantityInput) supplyQuantityInput.addEventListener('input', () => calculateTotalAmount(supplyQuantityInput, supplyUnitPriceInput, supplyTotalAmountInput));
    if(supplyUnitPriceInput) supplyUnitPriceInput.addEventListener('input', () => calculateTotalAmount(supplyQuantityInput, supplyUnitPriceInput, supplyTotalAmountInput));
    if(saleQuantityInput) saleQuantityInput.addEventListener('input', () => calculateTotalAmount(saleQuantityInput, saleUnitPriceInput, saleTotalAmountInput));
    if(saleUnitPriceInput) saleUnitPriceInput.addEventListener('input', () => calculateTotalAmount(saleQuantityInput, saleUnitPriceInput, saleTotalAmountInput));
    if(meQuantityInput) meQuantityInput.addEventListener('input', () => calculateTotalAmount(meQuantityInput, meUnitPriceInput, meTotalAmountInput));
    if(meUnitPriceInput) meUnitPriceInput.addEventListener('input', () => calculateTotalAmount(meQuantityInput, meUnitPriceInput, meTotalAmountInput));
    if(otherQuantityInput) otherQuantityInput.addEventListener('input', calculateOtherTotalAmount);
    if(otherUnitPriceInput) otherUnitPriceInput.addEventListener('input', calculateOtherTotalAmount);
    if(creditorQuantityInput) creditorQuantityInput.addEventListener('input', calculateCreditorTotalAmount);
    if(creditorUnitPriceInput) creditorUnitPriceInput.addEventListener('input', calculateCreditorTotalAmount);
    if(operationTypeSelect) operationTypeSelect.addEventListener('change', handleOperationTypeChange);
    if(creditorNameSelect) creditorNameSelect.addEventListener('change', function() { const selOpt = this.options[this.selectedIndex]; if (creditorContactInput) creditorContactInput.value = selOpt?.dataset?.contact || ''; });

    // --- NEW: Multi-Item Invoice Calculation & Item Management ---

    /** Calculates the total for the entire invoice based on all item rows */
    function calculateInvoiceTotal() {
        if (!invoiceItemsContainer || !invoiceGenTotalAmountInput || !invoiceGenTotalWordsInput) return;

        let grandTotal = 0;
        const itemRows = invoiceItemsContainer.querySelectorAll('.invoice-item-row');

        itemRows.forEach(row => {
            const quantityInput = row.querySelector('.item-quantity');
            const unitPriceInput = row.querySelector('.item-unit-price');
            const quantity = parseFloat(quantityInput?.value) || 0;
            const unitPrice = parseFloat(unitPriceInput?.value) || 0;
            grandTotal += quantity * unitPrice;
        });

        invoiceGenTotalAmountInput.value = formatAmount(grandTotal);
        invoiceGenTotalWordsInput.value = numberToWordsFrench(grandTotal);
    }

    /** Adds a new row for an invoice item */
    function addInvoiceItemRow() {
        if (!invoiceItemsContainer) return;

        const newRow = document.createElement('div');
        newRow.classList.add('form-row', 'invoice-item-row');
        newRow.innerHTML = `
            <div style="flex-basis: 40%;">
                <label for="invoice-gen-designation-${invoiceItemIndex}">Désignation:</label>
                <input type="text" id="invoice-gen-designation-${invoiceItemIndex}" class="item-designation" required>
            </div>
            <div>
                <label for="invoice-gen-quantity-${invoiceItemIndex}">Quantité:</label>
                <input type="number" id="invoice-gen-quantity-${invoiceItemIndex}" class="item-quantity" min="0" step="any" required>
            </div>
            <div>
                <label for="invoice-gen-unit-price-${invoiceItemIndex}">Prix Unitaire:</label>
                <input type="number" id="invoice-gen-unit-price-${invoiceItemIndex}" class="item-unit-price" min="0" step="any" required>
            </div>
            <div style="display: flex; align-items: flex-end;">
                <button type="button" class="action-btn delete-btn remove-invoice-item-btn" title="Supprimer Ligne" style="margin-bottom: 2px;">❌</button>
            </div>
        `;
        invoiceItemsContainer.appendChild(newRow);
        invoiceItemIndex++; // Increment index for next row's unique IDs

        // Add event listeners to new inputs immediately after adding the row
        const addedInputs = newRow.querySelectorAll('.item-quantity, .item-unit-price');
        addedInputs.forEach(input => input.addEventListener('input', calculateInvoiceTotal));

        calculateInvoiceTotal(); // Recalculate total after adding
    }

    // Event Listener for Adding Items
    if (addInvoiceItemButton) {
        addInvoiceItemButton.addEventListener('click', addInvoiceItemRow);
    }

    // Event Listener for Removing Items and Input Changes (using Event Delegation)
    if (invoiceItemsContainer) {
        invoiceItemsContainer.addEventListener('click', function(event) {
            if (event.target.classList.contains('remove-invoice-item-btn')) {
                const rowToRemove = event.target.closest('.invoice-item-row');
                 // Prevent removing the last row (optional - uncomment if needed)
                 if (invoiceItemsContainer.querySelectorAll('.invoice-item-row').length <= 1) {
                     alert("Vous devez avoir au moins une ligne d'article.");
                     return;
                 }
                if (rowToRemove) {
                    rowToRemove.remove();
                    calculateInvoiceTotal(); // Recalculate total after removing
                }
            }
        });

        // Add delegated event listener for input changes on quantity/price
        invoiceItemsContainer.addEventListener('input', function(event) {
            if (event.target.classList.contains('item-quantity') || event.target.classList.contains('item-unit-price')) {
                calculateInvoiceTotal();
            }
        });
    }

    /** Initializes the invoice form state, e.g., adds first row if empty */
    function initializeInvoiceForm() {
        // Only add a row if the container is completely empty
        if (invoiceItemsContainer && invoiceItemsContainer.children.length === 0) {
            addInvoiceItemRow();
        } else if (invoiceItemsContainer) {
             // If rows exist (e.g., static first row), ensure listeners are attached
             const existingInputs = invoiceItemsContainer.querySelectorAll('.item-quantity, .item-unit-price');
             existingInputs.forEach(input => {
                 // Avoid adding duplicate listeners if already handled by delegation
                 // We can rely solely on the container's delegation listener now.
             });
             calculateInvoiceTotal(); // Calculate total based on existing rows
        }

        if(invoiceGenDateInput && !invoiceGenDateInput.value) invoiceGenDateInput.value = new Date().toISOString().split('T')[0];
        if(invoiceGenNumberInput && !invoiceGenNumberInput.value) invoiceGenNumberInput.value = generateInvoiceNumber();
    }
     // --- END: Multi-Item Invoice ---


    // --- Gestionnaires d'événements pour Impression (Tables) ---
    const addPrintListener = (button, containerId) => { if (button) button.addEventListener('click', () => printSpecificTable(containerId)); };
    addPrintListener(printSupplyButton, 'supply-list-container'); addPrintListener(printStockButton, 'stock-details-container');
    addPrintListener(printSalesButton, 'sales-details-container'); addPrintListener(printMaterielElectriqueButton, 'materiel-electrique-details-container');
    addPrintListener(printExpensesButton, 'expenses-details-container'); addPrintListener(printOthersButton, 'others-details-container');
    addPrintListener(printEmployeesButton, 'employees-details-container'); addPrintListener(printLearnersButton, 'learners-details-container');
    addPrintListener(printMobileMoneyButton, 'mobile-money-details-container'); addPrintListener(printMmFournisseursButton, 'mm-fournisseurs-details-container');
    addPrintListener(printClientProfilesButton, 'client-profiles-container'); addPrintListener(printCreditorsButton, 'creditors-details-container');
    addPrintListener(printDebtButton, 'debt-details-container'); addPrintListener(printReportButton, 'report-details-container');
    addPrintListener(printEmployeePermissionsButton, 'employee-permissions-container'); addPrintListener(printLearnerPermissionsButton, 'learner-permissions-container');

    // --- Gestionnaires d'événements pour Export Excel ---
    const addExcelListener = (button, tableId, fileName) => { if (button) button.addEventListener('click', () => exportToExcel(tableId + '-table', fileName)); };
    addExcelListener(exportSupplyExcelButton, 'supply', 'Approvisionnements.xlsx'); addExcelListener(exportStockExcelButton, 'stock', 'Etat_Stocks.xlsx');
    addExcelListener(exportSalesExcelButton, 'sales', 'Ventes_Papeterie.xlsx'); addExcelListener(exportMaterielElectriqueExcelButton, 'materiel-electrique', 'Ventes_Mat_Electrique.xlsx');
    addExcelListener(exportExpensesExcelButton, 'expenses', 'Depenses.xlsx'); addExcelListener(exportOthersExcelButton, 'others', 'Operations_Diverses.xlsx');
    addExcelListener(exportEmployeesExcelButton, 'employees', 'Employes.xlsx'); addExcelListener(exportLearnersExcelButton, 'learners', 'Apprenants.xlsx');
    addExcelListener(exportMobileMoneyExcelButton, 'mobile-money', 'Mobile_Money_Points.xlsx'); addExcelListener(exportMmFournisseursExcelButton, 'mm-fournisseurs', 'Mobile_Money_Fournisseurs.xlsx');
    addExcelListener(exportClientProfilesExcelButton, 'client-profiles', 'Profils_Clients.xlsx'); addExcelListener(exportCreditorsExcelButton, 'creditors', 'Credits_Clients_Transactions.xlsx');
    addExcelListener(exportDebtExcelButton, 'debt', 'Dettes_Prets_Entreprise.xlsx'); addExcelListener(exportReportExcelButton, 'report', 'Bilan_Genere.xlsx');
    addExcelListener(exportEmployeePermissionsExcelButton, 'employee-permissions', 'Permissions_Employes.xlsx'); addExcelListener(exportLearnerPermissionsExcelButton, 'learner-permissions', 'Permissions_Apprenants.xlsx');

    // --- Gestionnaires d'événements pour Export PDF ---
    const addPdfListener = (button, tableId, fileName) => { if (button) button.addEventListener('click', () => exportToPdf(tableId + '-table', fileName)); };
    addPdfListener(exportSupplyPdfButton, 'supply', 'Approvisionnements.pdf'); addPdfListener(exportStockPdfButton, 'stock', 'Etat_Stocks.pdf');
    addPdfListener(exportSalesPdfButton, 'sales', 'Ventes_Papeterie.pdf'); addPdfListener(exportMaterielElectriquePdfButton, 'materiel-electrique', 'Ventes_Mat_Electrique.pdf');
    addPdfListener(exportExpensesPdfButton, 'expenses', 'Depenses.pdf'); addPdfListener(exportOthersPdfButton, 'others', 'Operations_Diverses.pdf');
    addPdfListener(exportEmployeesPdfButton, 'employees', 'Employes.pdf'); addPdfListener(exportLearnersPdfButton, 'learners', 'Apprenants.pdf');
    addPdfListener(exportMobileMoneyPdfButton, 'mobile-money', 'Mobile_Money_Points.pdf'); addPdfListener(exportMmFournisseursPdfButton, 'mm-fournisseurs', 'Mobile_Money_Fournisseurs.pdf');
    addPdfListener(exportClientProfilesPdfButton, 'client-profiles', 'Profils_Clients.pdf'); addPdfListener(exportCreditorsPdfButton, 'creditors', 'Credits_Clients_Transactions.pdf');
    addPdfListener(exportDebtPdfButton, 'debt', 'Dettes_Prets_Entreprise.pdf'); addPdfListener(exportReportPdfButton, 'report', 'Bilan_Genere.pdf');
    addPdfListener(exportEmployeePermissionsPdfButton, 'employee-permissions', 'Permissions_Employes.pdf'); addPdfListener(exportLearnerPermissionsPdfButton, 'learner-permissions', 'Permissions_Apprenants.pdf');

    // --- Gestionnaires d'événements pour les Rapports (Bilans) ---
     const showReportFilters = (showDaily, showWeekly, showMonthly, showYearly) => {
        if (reportFilters) reportFilters.classList.remove('hidden');
        if (dailyFilter) dailyFilter.classList.toggle('hidden', !showDaily); if (weeklyFilter) weeklyFilter.classList.toggle('hidden', !showWeekly);
        if (monthlyFilter) monthlyFilter.classList.toggle('hidden', !showMonthly); if (yearlyFilter) yearlyFilter.classList.toggle('hidden', !showYearly);
        if (reportDetailsContainer) reportDetailsContainer.classList.add('hidden'); if (showReportDetailsButton) showReportDetailsButton.classList.add('hidden');
        setTodaysDate();
     };
    if(dailyReportButton) dailyReportButton.addEventListener('click', () => showReportFilters(true, false, false, false));
    if(weeklyReportButton) weeklyReportButton.addEventListener('click', () => showReportFilters(false, true, false, false));
    if(monthlyReportButton) monthlyReportButton.addEventListener('click', () => showReportFilters(false, false, true, false));
    if(yearlyReportButton) yearlyReportButton.addEventListener('click', () => showReportFilters(false, false, false, true));

    if(generateReportButton) generateReportButton.addEventListener('click', function () {
        let selectedDate = null, selectedWeek = null, selectedMonth = null, selectedYear = null, filterType = '', filterLabel = '';
        if (!dailyFilter?.classList.contains('hidden')) { selectedDate = reportDateInput?.value; filterType = 'day'; filterLabel = selectedDate ? `Jour: ${selectedDate}` : 'Journalier'; }
        else if (!weeklyFilter?.classList.contains('hidden')) { selectedWeek = reportWeekInput?.value; filterType = 'week'; filterLabel = selectedWeek ? `Semaine: ${selectedWeek}` : 'Hebdomadaire'; }
        else if (!monthlyFilter?.classList.contains('hidden')) { selectedMonth = reportMonthInput?.value; filterType = 'month'; filterLabel = selectedMonth ? `Mois: ${selectedMonth}` : 'Mensuel'; }
        else if (!yearlyFilter?.classList.contains('hidden')) { selectedYear = reportYearInput?.value; filterType = 'year'; filterLabel = selectedYear ? `Année: ${selectedYear}` : 'Annuel'; }
        else { alert("Choisissez d'abord un type de bilan."); return; }
        if ((filterType === 'day' && !selectedDate) || (filterType === 'week' && !selectedWeek) || (filterType === 'month' && !selectedMonth) || (filterType === 'year' && !selectedYear)) { alert("Veuillez spécifier la période."); return; }

        const filterDataByDate = (data) => {
            if (!Array.isArray(data)) return [];
            return data.filter(item => {
                if (!item?.date) return false; const itemDateStr = item.date;
                try {
                    if (filterType === 'day') { return itemDateStr === selectedDate; }
                    if (filterType === 'month') { return itemDateStr.substring(0, 7) === selectedMonth; }
                    if (filterType === 'year') { return itemDateStr.substring(0, 4) === selectedYear.toString(); }
                    if (filterType === 'week') {
                        if (!selectedWeek?.includes('-W')) return false; const [yW, wW] = selectedWeek.split('-W').map(Number); if (isNaN(yW) || isNaN(wW)) return false;
                        const itemDate = new Date(itemDateStr + 'T00:00:00Z'); if (isNaN(itemDate.getTime())) return false;
                        const startOfWeek = getDateOfISOWeek(wW, yW); if (isNaN(startOfWeek.getTime())) return false;
                        const endOfWeek = new Date(startOfWeek); endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6); endOfWeek.setUTCHours(23, 59, 59, 999);
                        return itemDate >= startOfWeek && itemDate <= endOfWeek;
                    } return false;
                } catch (e) { console.error("Erreur filtre date:", item, filterType, selectedDate || selectedWeek || selectedMonth || selectedYear, e); return false; }
            });
        };
        const filteredSales = filterDataByDate(salesData); const filteredMESales = filterDataByDate(materielElectriqueData);
        const filteredExpenses = filterDataByDate(expensesData); const filteredOthers = filterDataByDate(othersData);
        const filteredSupplies = filterDataByDate(supplyData); const filteredMobileMoney = filterDataByDate(mobileMoneyData);
        updateReportTable(filteredSales, filteredMESales, filteredExpenses, filteredOthers, filteredSupplies, filteredMobileMoney, filterLabel);
        if (reportDetailsContainer) reportDetailsContainer.classList.remove('hidden'); if (showReportDetailsButton) showReportDetailsButton.classList.remove('hidden');
    });


    /** Met à jour la table du bilan. */
    function updateReportTable(papeterieSales, meSales, expenses, others, supplies, mobileMoney, filterLabel) {
         if (!reportTable) return;
         const reportTitleElement = reportDetailsContainer?.querySelector('h3'); if (reportTitleElement) reportTitleElement.textContent = `Bilan Généré (${filterLabel || 'Période Non Spécifiée'})`;
        reportTable.innerHTML = ''; let totalPapeterieAmount = papeterieSales.reduce((sum, item) => sum + (item.totalAmount || 0), 0); let totalPapeterieQuantity = papeterieSales.reduce((sum, item) => sum + (item.quantity || 0), 0);
        let totalMESalesAmount = meSales.reduce((sum, item) => sum + (item.totalAmount || 0), 0); let totalMESalesQuantity = meSales.reduce((sum, item) => sum + (item.quantity || 0), 0);
        let totalExpensesAmount = expenses.reduce((sum, item) => sum + (item.amount || 0), 0); let totalOthersAmount = others.reduce((sum, item) => sum + (item.totalAmount || 0), 0); let othersCount = others.length;
        const totalRevenu = totalPapeterieAmount + totalMESalesAmount + totalOthersAmount; let totalPerteTransfert = 0, totalPerteCredit = 0, lastMMEntry = null;
        if (mobileMoney.length > 0) { const sortedMM = [...mobileMoney].sort((a, b) => (a.date || '').localeCompare(b.date || '')); lastMMEntry = sortedMM[sortedMM.length - 1]; totalPerteTransfert = mobileMoney.reduce((sum, item) => sum + (item.perteTransfert || 0), 0); totalPerteCredit = mobileMoney.reduce((sum, item) => sum + (item.perteCredit || 0), 0); }
        const totalPertesMM = totalPerteTransfert + totalPerteCredit; const totalDepensesDirectes = totalExpensesAmount + totalPertesMM; const netResult = totalRevenu - totalDepensesDirectes;
        let totalSuppliesQuantity = supplies.reduce((sum, item) => sum + (item.quantity || 0), 0); let totalSuppliesCost = supplies.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
        const addRow = (type, detail, quantity, amount, style = {}) => {
            const row = reportTable.insertRow(); const cellType = row.insertCell(); cellType.textContent = type; cellType.style.fontWeight = style.typeFontWeight || 'normal';
            const cellDetail = row.insertCell(); cellDetail.textContent = detail; cellDetail.style.fontSize = '0.9em'; cellDetail.style.color = '#555';
            const qtyCell = row.insertCell(); qtyCell.textContent = quantity; qtyCell.classList.add('quantity-col');
            const amtCell = row.insertCell(); amtCell.textContent = typeof amount === 'number' ? formatAmount(amount) : amount; amtCell.classList.add('amount-col');
             Object.assign(row.style, style.rowStyle || {}); if(style.amountStyle) Object.assign(amtCell.style, style.amountStyle); if(style.typeStyle) Object.assign(cellType.style, style.typeStyle);
        };
         const headerRowStyle = { backgroundColor: 'var(--color-table-header-bg)', fontWeight: 'bold', typeStyle: { color: 'var(--color-primary)'}, rowStyle: { borderTop: '2px solid var(--color-primary-light)' } };
         const subRowStyle = { rowStyle: { paddingLeft: '15px' } }; const totalRowStyle = { fontWeight: 'bold', rowStyle: { borderTop: '1px solid #ccc'} };
         const incomeTotalStyle = {...totalRowStyle, rowStyle: {...totalRowStyle.rowStyle, backgroundColor: '#d4edda', color: '#155724'} };
         const expenseTotalStyle = {...totalRowStyle, rowStyle: {...totalRowStyle.rowStyle, backgroundColor: '#f8d7da', color: '#721c24'} };
         const netResultRowStyle = { fontWeight: 'bold', typeFontWeight: 'bold', amountStyle: { fontSize: '1.1em'}, rowStyle: { borderTop: '2px solid black', borderBottom: '2px solid black', backgroundColor: netResult >= 0 ? '#c3e6cb' : '#f5c6cb', color: netResult >= 0 ? '#155724' : '#721c24'} };
         const infoHeaderStyle = { backgroundColor: '#e8eaf6', fontWeight: 'bold', typeStyle: { color: 'var(--color-primary)'}, rowStyle: { borderTop: '2px solid var(--color-primary-light)' } };
         const infoRowStyle = { fontStyle: 'italic', rowStyle: { paddingLeft: '15px', backgroundColor: '#f8f9fa'}, typeStyle: {color: '#555'} };
        addRow('Revenus Opérationnels', '', '', '', headerRowStyle); addRow(' Ventes Papeterie', `Total ${papeterieSales.length} vente(s)`, totalPapeterieQuantity || '-', totalPapeterieAmount, subRowStyle); addRow(' Ventes Mat. Élec.', `Total ${meSales.length} vente(s)`, totalMESalesQuantity || '-', totalMESalesAmount, subRowStyle); addRow(' Opérations Diverses', `Total ${othersCount} op.`, '-', totalOthersAmount, subRowStyle); addRow(' TOTAL REVENUS', '', '', totalRevenu, incomeTotalStyle); addRow('', '', '', '', { rowStyle: { border: 'none', height: '10px' } });
        addRow('Dépenses Opérationnelles', '', '', '', headerRowStyle); addRow(' Dépenses Directes', `Total ${expenses.length} dépense(s)`, '-', totalExpensesAmount, subRowStyle); if (totalPerteTransfert > 0 || totalPerteCredit > 0) addRow(' Pertes Mobile Money', `Total sur période`, '-', totalPertesMM, {...subRowStyle, typeStyle: { color: '#a04040'} }); addRow(' TOTAL DEPENSES OP.', '', '', totalDepensesDirectes, expenseTotalStyle); addRow('', '', '', '', { rowStyle: { border: 'none', height: '15px' } });
        addRow('RESULTAT NET PERIODE', '(Revenus - Dépenses Op.)', '', netResult, netResultRowStyle); addRow('', '', '', '', { rowStyle: { border: 'none', height: '15px' } });
        addRow('Informations Additionnelles', '', '', '', infoHeaderStyle); if (supplies.length > 0) addRow(' Coût Approvisionnements', `(${supplies.length} appro., ${totalSuppliesQuantity || 0} unités)`, '', totalSuppliesCost, infoRowStyle);
        if (lastMMEntry) { const totalMMBalance = (lastMMEntry.balanceMoov || 0) + (lastMMEntry.balanceMTN || 0) + (lastMMEntry.balanceCelttis || 0) + (lastMMEntry.balanceCash || 0); const totalMMCredit = (lastMMEntry.creditMoov || 0) + (lastMMEntry.creditMTN || 0) + (lastMMEntry.creditCelttis || 0); addRow(' Solde Final MM Total', `Point du ${lastMMEntry.date}`, '-', totalMMBalance, infoRowStyle); if (totalMMCredit > 0) addRow(' Crédit Final MM Total', `Point du ${lastMMEntry.date}`, '-', totalMMCredit, { ...infoRowStyle, amountStyle: { color: '#cc8400' } }); }
        else if (mobileMoney.length === 0 && supplies.length === 0) addRow(' ', 'Aucune info additionnelle pour la période', '-', '-', infoRowStyle);
    }


    // --- DELETE FUNCTIONS ---
    window.deleteSupply = (index) => { if (index < 0 || index >= supplyData.length) return; const item = supplyData[index]; if (confirm(`Supprimer approvisionnement ${item.date || '?'} pour "${item.designation || '?'}" (Qté: ${item.quantity || '?'}) ? Affecte stock.`)) { const reqStkUpd = item.type === 'Papeterie' || item.type === 'Matériels électrique'; supplyData.splice(index, 1); localStorage.setItem('supplyData', JSON.stringify(supplyData)); updateSupplyTable(); if (reqStkUpd) { updateStockTable(); } alert('Approvisionnement supprimé.'); } };
    window.deleteSale = (index) => { if (index < 0 || index >= salesData.length) return; const item = salesData[index]; if (confirm(`Supprimer vente Papeterie ${item.date || '?'} pour "${item.designation || '?'}" (Qté: ${item.quantity || '?'}) ? Affecte stock.`)) { salesData.splice(index, 1); localStorage.setItem('salesData', JSON.stringify(salesData)); updateSalesTable(); updateStockTable(); alert('Vente Papeterie supprimée. Stock màj.'); } };
    window.deleteMaterielElectriqueSale = (index) => { if (index < 0 || index >= materielElectriqueData.length) return; const item = materielElectriqueData[index]; if (confirm(`Supprimer vente Mat. Elec. ${item.date || '?'} pour "${item.designation || '?'}" (Qté: ${item.quantity || '?'}) ? Affecte stock.`)) { materielElectriqueData.splice(index, 1); localStorage.setItem('materielElectriqueData', JSON.stringify(materielElectriqueData)); updateMaterielElectriqueTable(); updateStockTable(); alert('Vente Mat. Elec. supprimée. Stock màj.'); } };
    window.deleteExpense = (index) => { if (index < 0 || index >= expensesData.length) return; const item = expensesData[index]; if (confirm(`Supprimer dépense ${item.date || '?'} ("${item.reason || '?'}", ${formatAmount(item.amount)}) ?`)) { expensesData.splice(index, 1); localStorage.setItem('expensesData', JSON.stringify(expensesData)); updateExpensesTable(); alert('Dépense supprimée.'); } };
    window.deleteOther = (index) => { if (index < 0 || index >= othersData.length) return; const item = othersData[index]; if (confirm(`Supprimer opération diverse ${item.date || '?'} ("${item.designation || '?'}", ${formatAmount(item.totalAmount)}) ?`)) { othersData.splice(index, 1); localStorage.setItem('othersData', JSON.stringify(othersData)); updateOthersTable(); alert('Opération diverse supprimée.'); } };
    window.deleteEmployee = (index) => { if (index < 0 || index >= employeesData.length) return; const item = employeesData[index]; if (confirm(`Supprimer employé: ${item.nom || '?'} ${item.prenom || ''} ?`)) { employeesData.splice(index, 1); localStorage.setItem('employeesData', JSON.stringify(employeesData)); updateEmployeesTable(); populateEmployeeSelectForPermission(); alert('Employé supprimé.'); } };
     window.deleteLearner = (index) => { if (index < 0 || index >= learnersData.length) return; const item = learnersData[index]; if (confirm(`Supprimer apprenant: ${item.nom || '?'} ${item.prenom || ''} (Filière: ${item.filiere || 'N/A'}) ?`)) { learnersData.splice(index, 1); localStorage.setItem('learnersData', JSON.stringify(learnersData)); updateLearnersTable(); populateLearnerSelectForPermission(); alert('Apprenant supprimé.'); } };
     window.deleteMobileMoney = (originalIndex) => { if (originalIndex < 0 || originalIndex >= mobileMoneyData.length) { alert("Impossible supprimer : index invalide."); return; } const item = mobileMoneyData[originalIndex]; if (confirm(`Supprimer point MM ${item.date || '?'} (Agent: ${item.agent || '?'}) ?`)) { mobileMoneyData.splice(originalIndex, 1); localStorage.setItem('mobileMoneyData', JSON.stringify(mobileMoneyData)); updateMobileMoneyTable(); alert('Point MM supprimé.'); } };
    window.deleteMmFournisseur = (nom, prenom) => { const sN = String(nom || '').replace(/\\'/g, "'"); const sP = String(prenom || '').replace(/\\'/g, "'"); if (confirm(`Supprimer fournisseur MM ${sN} ${sP} ?`)) { const initLen = mmFournisseursData.length; mmFournisseursData = mmFournisseursData.filter(f => !(f.nom === sN && f.prenom === sP)); if (mmFournisseursData.length < initLen) { localStorage.setItem('mmFournisseursData', JSON.stringify(mmFournisseursData)); updateMmFournisseursTable(); alert(`Fournisseur ${sN} ${sP} supprimé.`); } else { alert(`Erreur : Fournisseur ${sN} ${sP} non trouvé.`); } } };
    window.deleteClientProfile = (nom, prenom) => { const sN = String(nom || '').replace(/\\'/g, "'"); const sP = String(prenom || '').replace(/\\'/g, "'"); const clientFullName = `${sN} ${sP}`.trim(); const hasActiveCredit = creditorsData.some(c => c.name === clientFullName && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) > 0.005)); if (hasActiveCredit) { alert(`Impossible supprimer profil ${clientFullName}, crédits client en cours non soldés.`); return; } if (confirm(`Supprimer profil client ${clientFullName} ? ATTENTION : Supprimera aussi crédits SOLDÉS associés.`)) { const initLen = clientProfilesData.length; clientProfilesData = clientProfilesData.filter(p => !(p.nom === sN && p.prenom === sP)); if (clientProfilesData.length < initLen) { const initCredLen = creditorsData.length; creditorsData = creditorsData.filter(c => !(c.name === clientFullName && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) <= 0.005))); const credRemoved = initCredLen - creditorsData.length; localStorage.setItem('clientProfilesData', JSON.stringify(clientProfilesData)); localStorage.setItem('creditorsData', JSON.stringify(creditorsData)); updateClientProfilesTable(); populateClientSelect(); updateCreditorsTable(); alert(`Profil ${clientFullName} supprimé.` + (credRemoved > 0 ? ` ${credRemoved} crédit(s) soldé(s) associé(s) supprimé(s).` : '')); } else { alert(`Erreur : Profil ${clientFullName} non trouvé.`); } } };
    window.deleteCreditor = (originalIndex) => { if (originalIndex < 0 || originalIndex >= creditorsData.length) { alert("Impossible supprimer : index invalide."); return; } const item = creditorsData[originalIndex]; const remaining = (item.totalAmountDue || 0) - (item.amountPaidTotal || 0); if (confirm(`Supprimer TOUTE transaction crédit pour ${item.name || '?'} ("${item.designation || '?'}")?\nSolde actuel: ${formatAmount(remaining)}.\nATTENTION : Irréversible.`)) { creditorsData.splice(originalIndex, 1); localStorage.setItem('creditorsData', JSON.stringify(creditorsData)); updateCreditorsTable(); alert('Transaction crédit supprimée.'); } };
    window.deleteDebt = (originalIndex) => { if (originalIndex < 0 || originalIndex >= debtData.length) { alert("Impossible supprimer : index invalide."); return; } const item = debtData[originalIndex]; if (confirm(`Supprimer ${item.type || 'entrée'}: ${item.name || '?'} ("${item.description || '?'}", ${formatAmount(item.amount)}) ?`)) { debtData.splice(originalIndex, 1); localStorage.setItem('debtData', JSON.stringify(debtData)); updateDebtTable(); alert(`${item.type || 'Entrée'} supprimé(e).`); } };
    window.deletePermission = (type, index) => { let dArr, uFunc, sKey, iType; if (type === 'employee') { dArr = employeePermissionsData; uFunc = updateEmployeePermissionsTable; sKey = 'employeePermissionsData'; iType = 'employé'; } else if (type === 'learner') { dArr = learnerPermissionsData; uFunc = updateLearnerPermissionsTable; sKey = 'learnerPermissionsData'; iType = 'apprenant'; } else return; if (index < 0 || index >= dArr.length) { alert("Erreur: Impossible supprimer demande."); return; } const perm = dArr[index]; if (confirm(`Supprimer demande permission pour ${perm.name || '?'} (${iType}) du ${perm.requestDate || '?'} ?`)) { dArr.splice(index, 1); localStorage.setItem(sKey, JSON.stringify(dArr)); uFunc(); alert('Demande permission supprimée.'); } };


    // --- EDIT FUNCTIONS ---
     window.editSupply = (index) => { if (index < 0 || index >= supplyData.length) return; const item = supplyData[index]; if (!supplyForm || !supplyEditIndexInput || !supplyDateInput || !supplyTypeSelect || !supplyDesignationInput || !supplyQuantityInput || !supplyUnitPriceInput || !supplyTotalAmountInput) { alert("Erreur: Formulaire appro. incomplet."); return; } supplyForm.reset(); supplyDateInput.value = item.date || ''; supplyTypeSelect.value = item.type || ''; supplyDesignationInput.value = item.designation || ''; supplyQuantityInput.value = item.quantity || ''; supplyUnitPriceInput.value = item.unitPrice !== null ? item.unitPrice : ''; calculateTotalAmount(supplyQuantityInput, supplyUnitPriceInput, supplyTotalAmountInput); supplyEditIndexInput.value = index; supplyForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Approvisionnement'; supplySection?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
    window.editEmployee = (index) => { if (index < 0 || index >= employeesData.length) return; const emp = employeesData[index]; if (!employeeForm || !employeeEditIndexInput) { alert("Erreur: Formulaire employé introuvable."); return; } employeeForm.reset(); if(employeeNomInput) employeeNomInput.value = emp.nom || ''; if(employeePrenomInput) employeePrenomInput.value = emp.prenom || ''; if(employeeRoleInput) employeeRoleInput.value = emp.statut || ''; if(employeeAdresseInput) employeeAdresseInput.value = emp.adresse || ''; if(employeeTelephoneInput) employeeTelephoneInput.value = emp.telephone || ''; if(employeeLieuResidenceInput) employeeLieuResidenceInput.value = emp.lieuResidence || ''; if(employeeJoursTravailInput) employeeJoursTravailInput.value = emp.joursTravail || ''; if(employeeHeureArriveeInput) employeeHeureArriveeInput.value = emp.heureArrivee || ''; if(employeeHeureDepartInput) employeeHeureDepartInput.value = emp.heureDepart || ''; if(employeeSalaryInput) employeeSalaryInput.value = emp.salary !== null ? emp.salary : ''; if(employeePaidAmountInput) employeePaidAmountInput.value = emp.paidAmount || ''; if(employeeHireDateInput) employeeHireDateInput.value = emp.hireDate || ''; if(employeeContactPersonNomInput) employeeContactPersonNomInput.value = emp.contactPersonNom || ''; if(employeeContactPersonPrenomInput) employeeContactPersonPrenomInput.value = emp.contactPersonPrenom || ''; if(employeeContactPersonAdresseInput) employeeContactPersonAdresseInput.value = emp.contactPersonAdresse || ''; if(employeeContactPersonTelephoneInput) employeeContactPersonTelephoneInput.value = emp.contactPersonTelephone || ''; if(employeeContactPersonLieuResidenceInput) employeeContactPersonLieuResidenceInput.value = emp.contactPersonLieuResidence || ''; employeeEditIndexInput.value = index; employeeForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Employé'; employeesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
     window.editLearner = (index) => { if (index < 0 || index >= learnersData.length) return; const lrn = learnersData[index]; if (!learnerForm || !learnerEditIndexInput) { alert("Erreur: Formulaire apprenant introuvable."); return; } learnerForm.reset(); if(learnerNomInput) learnerNomInput.value = lrn.nom || ''; if(learnerPrenomInput) learnerPrenomInput.value = lrn.prenom || ''; if(learnerAgeInput) learnerAgeInput.value = lrn.age !== null ? lrn.age : ''; if(learnerAdresseInput) learnerAdresseInput.value = lrn.adresse || ''; if(learnerLieuResidenceInput) learnerLieuResidenceInput.value = lrn.lieuResidence || ''; if(learnerNiveauEtudesInput) learnerNiveauEtudesInput.value = lrn.niveauEtudes || ''; if(learnerSituationMatrimonialeSelect) learnerSituationMatrimonialeSelect.value = lrn.situationMatrimoniale || ''; if(learnerPereNomInput) learnerPereNomInput.value = lrn.pereNom || ''; if(learnerPerePrenomInput) learnerPerePrenomInput.value = lrn.perePrenom || ''; if(learnerMereNomInput) learnerMereNomInput.value = lrn.mereNom || ''; if(learnerMerePrenomInput) learnerMerePrenomInput.value = lrn.merePrenom || ''; if(learnerFiliereInput) learnerFiliereInput.value = lrn.filiere || ''; if(learnerDureeFormationInput) learnerDureeFormationInput.value = lrn.dureeFormation || ''; if(learnerFraisDocumentsInput) learnerFraisDocumentsInput.value = lrn.fraisDocuments || ''; if(learnerTranche1Input) learnerTranche1Input.value = lrn.tranche1 || ''; if(learnerTranche2Input) learnerTranche2Input.value = lrn.tranche2 || ''; if(learnerTranche3Input) learnerTranche3Input.value = lrn.tranche3 || ''; if(learnerTranche4Input) learnerTranche4Input.value = lrn.tranche4 || ''; if(learnerGarantNomInput) learnerGarantNomInput.value = lrn.garantNom || ''; if(learnerGarantPrenomInput) learnerGarantPrenomInput.value = lrn.garantPrenom || ''; if(learnerGarantTelephoneInput) learnerGarantTelephoneInput.value = lrn.garantTelephone || ''; if(learnerGarantAdresseInput) learnerGarantAdresseInput.value = lrn.garantAdresse || ''; learnerEditIndexInput.value = index; learnerForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Apprenant'; learnersSection?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
     window.editMobileMoney = (originalIndex) => { if (originalIndex < 0 || originalIndex >= mobileMoneyData.length) { alert("Impossible modifier : index invalide."); return; } const item = mobileMoneyData[originalIndex]; if (!mobileMoneyForm || !mobileMoneyEditIndexInput) { alert("Erreur: Formulaire Mobile Money introuvable."); return; } mobileMoneyForm.reset(); if(mmDateInput) mmDateInput.value = item.date || ''; if(mmAgentInput) mmAgentInput.value = item.agent || ''; if(mmBalanceMoovInput) mmBalanceMoovInput.value = item.balanceMoov || ''; if(mmBalanceMtnInput) mmBalanceMtnInput.value = item.balanceMTN || ''; if(mmBalanceCelttisInput) mmBalanceCelttisInput.value = item.balanceCelttis || ''; if(mmBalanceCashInput) mmBalanceCashInput.value = item.balanceCash || ''; if(mmCreditMoovInput) mmCreditMoovInput.value = item.creditMoov || ''; if(mmCreditMtnInput) mmCreditMtnInput.value = item.creditMTN || ''; if(mmCreditCelttisInput) mmCreditCelttisInput.value = item.creditCelttis || ''; if(mmPerteTransfertInput) mmPerteTransfertInput.value = item.perteTransfert || ''; if(mmPerteCreditInput) mmPerteCreditInput.value = item.perteCredit || ''; mobileMoneyEditIndexInput.value = originalIndex; mobileMoneyForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Point MM'; mobileMoneySection?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
     window.editMmFournisseur = (nom, prenom) => { const sN = String(nom || '').replace(/\\'/g, "'"); const sP = String(prenom || '').replace(/\\'/g, "'"); const key = `${sN}_${sP}`; const f = mmFournisseursData.find(f => f.nom === sN && f.prenom === sP); if (f && mmFournisseurForm && mmFournisseurEditKeyInput) { mmFournisseurForm.reset(); if(mmFournisseurNomInput) mmFournisseurNomInput.value = f.nom || ''; if(mmFournisseurPrenomInput) mmFournisseurPrenomInput.value = f.prenom || ''; if(mmFournisseurContactInput) mmFournisseurContactInput.value = f.contact || ''; if(mmFournisseurMontantInput) mmFournisseurMontantInput.value = f.montantFourni || ''; if(mmFournisseurInteretInput) mmFournisseurInteretInput.value = f.interet !== null ? f.interet : ''; if(mmFournisseurVenduInput) mmFournisseurVenduInput.value = f.creditVendu || ''; mmFournisseurEditKeyInput.value = key; mmFournisseurForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Fournisseur'; mmFournisseurForm?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } else { alert(`Fournisseur ${sN} ${sP} non trouvé ou formulaire incomplet.`); if(mmFournisseurEditKeyInput) mmFournisseurEditKeyInput.value = ''; } };
     window.editClientProfile = (nom, prenom) => { const sN = String(nom || '').replace(/\\'/g, "'"); const sP = String(prenom || '').replace(/\\'/g, "'"); const key = `${sN}_${sP}`; const p = clientProfilesData.find(p => p.nom === sN && p.prenom === sP); if (p && clientProfileForm && clientProfileEditKeyInput) { clientProfileForm.reset(); if(clientProfileNomInput) clientProfileNomInput.value = p.nom || ''; if(clientProfilePrenomInput) clientProfilePrenomInput.value = p.prenom || ''; if(clientProfileAdresseInput) clientProfileAdresseInput.value = p.adresse || ''; if(clientProfileContactInput) clientProfileContactInput.value = p.contact || ''; if(clientProfileStatutInput) clientProfileStatutInput.value = p.statut || ''; clientProfileEditKeyInput.value = key; clientProfileForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Profil'; clientProfileForm?.scrollIntoView({ behavior: 'smooth', block: 'start' }); } else { alert(`Profil ${sN} ${sP} non trouvé ou formulaire incomplet.`); if(clientProfileEditKeyInput) clientProfileEditKeyInput.value = ''; } };
    window.editDebt = (originalIndex) => { if (originalIndex < 0 || originalIndex >= debtData.length) { alert("Impossible modifier : index invalide."); return; } const item = debtData[originalIndex]; if (!debtForm || !debtEditIndexInput) { alert("Erreur: Formulaire Dette/Prêt introuvable."); return; } debtForm.reset(); if(debtDateInput) debtDateInput.value = item.date || ''; if(debtTypeSelect) debtTypeSelect.value = item.type || ''; if(debtNameInput) debtNameInput.value = item.name || ''; if(debtDescriptionInput) debtDescriptionInput.value = item.description || ''; if(debtAmountInput) debtAmountInput.value = item.amount || ''; if(debtDueDateInput) debtDueDateInput.value = item.dueDate || ''; if(debtStatusSelect) debtStatusSelect.value = item.status || ''; debtEditIndexInput.value = originalIndex; debtForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Dette/Prêt'; debtSection?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };

    // --- PERMISSION ACTION FUNCTIONS ---
    window.updatePermissionStatus = (type, index, newStatus) => { let dArr, uFunc, sKey; if (type === 'employee') { dArr = employeePermissionsData; uFunc = updateEmployeePermissionsTable; sKey = 'employeePermissionsData'; } else if (type === 'learner') { dArr = learnerPermissionsData; uFunc = updateLearnerPermissionsTable; sKey = 'learnerPermissionsData'; } else return; if (index < 0 || index >= dArr.length) { alert("Erreur: Impossible màj statut."); return; } dArr[index].status = newStatus; localStorage.setItem(sKey, JSON.stringify(dArr)); uFunc(); alert(`Statut demande màj à "${newStatus}".`); };


    // --- PAYMENT RECORDING FUNCTIONS ---
    window.recordSalaryPayment = (index) => { if (index < 0 || index >= employeesData.length) return; const emp = employeesData[index]; const salary = emp.salary !== null ? parseFloat(emp.salary) : 0; const totalPaid = emp.paidAmount || 0; const remaining = salary - totalPaid; const paymentDate = prompt("Date paiement (AAAA-MM-JJ) :", new Date().toISOString().split('T')[0]); if (!paymentDate || !/^\d{4}-\d{2}-\d{2}$/.test(paymentDate)) { if (paymentDate !== null) alert("Format date invalide."); return; } const amountStr = prompt(`Employé: ${emp.nom || ''} ${emp.prenom || ''}\nSalaire: ${formatAmount(salary)}\nDéjà Payé: ${formatAmount(totalPaid)}\nRestant: ${formatAmount(remaining)}\n\nMontant payé :`, remaining > 0 ? formatAmount(remaining) : '0.00'); if (amountStr === null) return; const amountPaidThisTime = parseFloat(amountStr); if (isNaN(amountPaidThisTime) || amountPaidThisTime < 0) { alert("Montant invalide."); return; } if (amountPaidThisTime > remaining + 0.005) { alert(`Montant payé (${formatAmount(amountPaidThisTime)}) > solde restant (${formatAmount(remaining)}).`); return; } if (amountPaidThisTime <= 0) { alert("Aucun paiement enregistré (montant <= 0)."); return; } emp.paidAmount = (emp.paidAmount || 0) + amountPaidThisTime; localStorage.setItem('employeesData', JSON.stringify(employeesData)); updateEmployeesTable(); alert(`Paiement de ${formatAmount(amountPaidThisTime)} enregistré pour ${emp.nom} ${emp.prenom}.`); if (confirm('Imprimer un reçu ?')) { printSalaryInvoice(index, paymentDate, amountPaidThisTime); } };
    window.recordTranchePayment = (index) => { if (index < 0 || index >= learnersData.length) return; const lrn = learnersData[index]; const paymentDate = prompt("Date paiement (AAAA-MM-JJ) :", new Date().toISOString().split('T')[0]); if (!paymentDate || !/^\d{4}-\d{2}-\d{2}$/.test(paymentDate)) { if (paymentDate !== null) alert("Format date invalide."); return; } const paymentReason = prompt(`Paiement pour ${lrn.nom} ${lrn.prenom}.\nMotif (Ex: Tranche 1):`, "Paiement Tranche"); if (!paymentReason) return; const amountStr = prompt("Montant payé :"); if (amountStr === null) return; const amountPaidThisTime = parseFloat(amountStr); if (isNaN(amountPaidThisTime) || amountPaidThisTime <= 0) { alert("Montant invalide."); return; } const trancheChoice = prompt( `Ligne concernée par paiement de ${formatAmount(amountPaidThisTime)} ?\n1. Frais Docs (${formatAmount(lrn.fraisDocuments)})\n2. Tr. 1 (${formatAmount(lrn.tranche1)})\n3. Tr. 2 (${formatAmount(lrn.tranche2)})\n4. Tr. 3 (${formatAmount(lrn.tranche3)})\n5. Tr. 4 (${formatAmount(lrn.tranche4)})\nNuméro (1-5). ATTENTION: Ajoute au montant actuel.` ); if (!trancheChoice) return; const choice = parseInt(trancheChoice); if (isNaN(choice) || choice < 1 || choice > 5) { alert("Choix invalide."); return; } let updated = false; switch (choice) { case 1: lrn.fraisDocuments = (lrn.fraisDocuments || 0) + amountPaidThisTime; updated = true; break; case 2: lrn.tranche1 = (lrn.tranche1 || 0) + amountPaidThisTime; updated = true; break; case 3: lrn.tranche2 = (lrn.tranche2 || 0) + amountPaidThisTime; updated = true; break; case 4: lrn.tranche3 = (lrn.tranche3 || 0) + amountPaidThisTime; updated = true; break; case 5: lrn.tranche4 = (lrn.tranche4 || 0) + amountPaidThisTime; updated = true; break; } if (updated) { localStorage.setItem('learnersData', JSON.stringify(learnersData)); updateLearnersTable(); alert(`Paiement ${formatAmount(amountPaidThisTime)} pour ${paymentReason} - ${lrn.nom}. Ajouté.`); if (confirm('Imprimer un reçu ?')) { printLearnerInvoice(index, paymentDate, paymentReason, amountPaidThisTime); } } };

    // --- INVOICE FUNCTIONS ---
    function printSalaryInvoice(employeeIndex, paymentDate, amountPaidThisTime) {
        if (employeeIndex < 0 || employeeIndex >= employeesData.length) return;
        const emp = employeesData[employeeIndex];
        const invoiceArea = document.getElementById('invoice-print-area');
        if (!invoiceArea) { alert("Erreur: Zone impression reçu introuvable."); return;}

        const salary = emp.salary !== null ? parseFloat(emp.salary) : 0;
        const totalPaid = emp.paidAmount || 0;
        const remaining = salary - totalPaid;
        const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // --- COMPANY INFO ---
        const companyName = "La Charité Modeste";
        const companyServices = "TOUS TRAVAUX DE SECRETARIAT : Photocopie-Saisie, Tirage, Plastification-Vente Des fournitures scolaires – Vente des ampoules électriques Etc.....";
        const companyLegal = "N°RCCM: RB / PK 0/A5519 /IFU 0201810420946";
        const companyLocation = "PARAKOU (Rép Du Bénin)";
        const companyPhone = "61 71 36 92 / 64 41 58 95";
        const managerName = "Modeste KODA MICHEL"; // Added Manager Name
        // --- END COMPANY INFO ---

        // --- HTML Generation ---
        const invoiceHTML = `
            <div class="invoice-header">
                <div>
                    <!-- Using the preloaded logo.jpg -->
                    <img src="logo.jpg" alt="Logo" class="invoice-logo">
                    <div class="invoice-details">
                        <strong>${companyName}</strong><br>
                        ${companyServices}<br>
                        ${companyLegal}<br>
                        ${companyLocation}<br>
                        Tél: ${companyPhone}
                    </div>
                </div>
                <div class="invoice-title">
                    <h2>Reçu de Paiement Salaire</h2>
                    <div class="invoice-details">
                        Date émission: ${today}<br>
                        Date paiement: ${paymentDate || '-'}<br>
                        Reçu #: EMP-${employeeIndex}-${Date.now().toString().slice(-5)}
                    </div>
                </div>
            </div>
            <hr>
            <div class="invoice-client-details">
                <strong>Employé:</strong><br>
                ${emp.nom || ''} ${emp.prenom || ''}${emp.statut ? `<br>Statut: ${emp.statut}` : ''}${emp.telephone ? `<br>Contact: ${emp.telephone}` : ''}
            </div>
            <div class="invoice-items">
                <h4 style="margin-bottom: 5px;">Détail Paiement</h4>
                <table>
                    <thead><tr><th>Description</th><th class="amount">Montant Payé</th></tr></thead>
                    <tbody><tr><td>Paiement salaire (Effectué le: ${paymentDate || '-'})</td><td class="amount">${formatAmount(amountPaidThisTime)}</td></tr></tbody>
                </table>
            </div>
            <div class="invoice-summary">
                Salaire base: <strong>${emp.salary !== null ? formatAmount(salary) : 'N/A'}</strong><br style="clear: both;">
                Payé ce jour: <strong>${formatAmount(amountPaidThisTime)}</strong><br style="clear: both;">
                Total payé cumulé: <strong>${formatAmount(totalPaid)}</strong><br style="clear: both;">
                <hr>
                Solde restant: <strong style="font-size: 1.1em; color: ${remaining <= 0.005 ? 'green' : 'red'};">${formatAmount(remaining)}</strong><br style="clear: both;">
            </div>
            <!-- ADDED SIGNATURE SECTION -->
            <div style="margin-top: 40px; text-align: right; padding-right: 30px;">
                Signature<br><br><br><br>
                <strong>${managerName}</strong>
            </div>
            <!-- END SIGNATURE SECTION -->
            <div class="invoice-footer">Reçu généré le ${today}. Merci.</div>`;
        // --- END HTML Generation ---

        invoiceArea.innerHTML = invoiceHTML;
        printElement('invoice-print-area');
    }

    function printLearnerInvoice(learnerIndex, paymentDate, paymentReason, amountPaidThisTime) {
        if (learnerIndex < 0 || learnerIndex >= learnersData.length) return;
        const lrn = learnersData[learnerIndex];
        const invoiceArea = document.getElementById('invoice-print-area');
        if (!invoiceArea) { alert("Erreur: Zone impression reçu introuvable."); return;}

        const fraisDocs = lrn.fraisDocuments || 0;
        const tranchesPayees = [lrn.tranche1 || 0, lrn.tranche2 || 0, lrn.tranche3 || 0, lrn.tranche4 || 0];
        const totalPaid = fraisDocs + tranchesPayees.reduce((sum, val) => sum + val, 0);
        const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // --- COMPANY INFO ---
        const companyName = "La Charité Modeste";
        const companyServices = "TOUS TRAVAUX DE SECRETARIAT : Photocopie-Saisie, Tirage, Plastification-Vente Des fournitures scolaires – Vente des ampoules électriques Etc.....";
        const companyLegal = "N°RCCM: RB / PK 0/A5519 /IFU 0201810420946";
        const companyLocation = "PARAKOU (Rép Du Bénin)";
        const companyPhone = "61 71 36 92 / 64 41 58 95";
        const managerName = "Modeste KODA MICHEL"; // Added Manager Name
        // --- END COMPANY INFO ---

        // --- HTML Generation ---
        const invoiceHTML = `
            <div class="invoice-header">
                 <div>
                     <!-- Using the preloaded logo.jpg -->
                    <img src="logo.jpg" alt="Logo" class="invoice-logo">
                    <div class="invoice-details">
                        <strong>${companyName}</strong><br>
                        ${companyServices}<br>
                        ${companyLegal}<br>
                        ${companyLocation}<br>
                        Tél: ${companyPhone}
                    </div>
                </div>
                <div class="invoice-title">
                    <h2>Reçu Paiement Formation</h2>
                    <div class="invoice-details">
                        Date émission: ${today}<br>
                        Date paiement: ${paymentDate || '-'}<br>
                        Reçu #: LRN-${learnerIndex}-${Date.now().toString().slice(-5)}
                    </div>
                </div>
            </div>
            <hr>
            <div class="invoice-client-details">
                <strong>Apprenant:</strong><br>
                ${lrn.nom || ''} ${lrn.prenom || ''}<br>
                Filière: ${lrn.filiere || '-'}${lrn.telephone ? `<br>Contact Apprenant: ${lrn.telephone}` : ''}${lrn.garantTelephone ? `<br>Contact Garant: ${lrn.garantTelephone}` : ''}
            </div>
            <div class="invoice-items">
                 <h4 style="margin-bottom: 5px;">Détail Paiement</h4>
                 <table>
                    <thead><tr><th>Description</th><th class="amount">Montant Payé</th></tr></thead>
                    <tbody><tr><td>${paymentReason || 'Paiement Formation'} (Effectué le: ${paymentDate || '-'})</td><td class="amount">${formatAmount(amountPaidThisTime)}</td></tr></tbody>
                </table>
            </div>
            <div class="invoice-summary">
                Payé ce jour: <strong>${formatAmount(amountPaidThisTime)}</strong><br style="clear: both;">
                Total cumulé payé (enregistré): <strong>${formatAmount(totalPaid)}</strong><br style="clear: both;">
                <br>
            </div>
            <div class="invoice-items" style="margin-top: 15px;">
                <h4 style="font-size: 10pt; margin-bottom: 5px; border-bottom: none;">Situation paiements enregistrés :</h4>
                <table style="font-size: 9pt;">
                    <thead><tr><th>Item</th><th class="amount">Montant Enregistré</th></tr></thead>
                    <tbody>
                        <tr><td>Frais Docs</td><td class="amount">${formatAmount(fraisDocs)}</td></tr>
                        <tr><td>Tranche 1</td><td class="amount">${formatAmount(lrn.tranche1)}</td></tr>
                        <tr><td>Tranche 2</td><td class="amount">${formatAmount(lrn.tranche2)}</td></tr>
                        <tr><td>Tranche 3</td><td class="amount">${formatAmount(lrn.tranche3)}</td></tr>
                        <tr><td>Tranche 4</td><td class="amount">${formatAmount(lrn.tranche4)}</td></tr>
                        <tr style="font-weight: bold; border-top: 1px solid #ccc;"><td>Total Enregistré</td><td class="amount">${formatAmount(totalPaid)}</td></tr>
                    </tbody>
                </table>
            </div>
            <!-- ADDED SIGNATURE SECTION -->
            <div style="margin-top: 40px; text-align: right; padding-right: 30px;">
                Signature<br><br><br><br>
                <strong>${managerName}</strong>
            </div>
            <!-- END SIGNATURE SECTION -->
            <div class="invoice-footer">Reçu généré le ${today}. Bonne continuation.</div>`;
        // --- END HTML Generation ---

        invoiceArea.innerHTML = invoiceHTML;
        printElement('invoice-print-area');
    }

     window.printCreditReceipt = (originalIndex) => {
        if (originalIndex < 0 || originalIndex >= creditorsData.length) { alert("Impossible imprimer : index invalide."); return; }
        const cred = creditorsData[originalIndex];
        const invoiceArea = document.getElementById('invoice-print-area');
        if (!invoiceArea) { alert("Erreur: Zone impression reçu introuvable."); return;}

        const totalDue = cred.totalAmountDue || 0;
        const totalPaid = cred.amountPaidTotal || 0;
        const remaining = totalDue - totalPaid;
        const lastOpDate = cred.lastPaymentDate || cred.date || 'N/A';
        const initialDate = cred.date || 'N/A';
        const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
        const clientProfile = clientProfilesData.find(p => `${p.nom || ''} ${p.prenom || ''}`.trim() === cred.name);
        const clientContact = clientProfile ? clientProfile.contact : '-';
        const clientAddress = clientProfile ? clientProfile.adresse : '-';

        // --- COMPANY INFO ---
        const companyName = "La Charité Modeste";
        const companyServices = "TOUS TRAVAUX DE SECRETARIAT : Photocopie-Saisie, Tirage, Plastification-Vente Des fournitures scolaires – Vente des ampoules électriques Etc.....";
        const companyLegal = "N°RCCM: RB / PK 0/A5519 /IFU 0201810420946";
        const companyLocation = "PARAKOU (Rép Du Bénin)";
        const companyPhone = "61 71 36 92 / 64 41 58 95";
        const managerName = "Modeste KODA MICHEL"; // Added Manager Name
        // --- END COMPANY INFO ---

        // --- HTML Generation ---
        const invoiceHTML = `
            <div class="invoice-header">
                 <div>
                     <!-- Using the preloaded logo.jpg -->
                    <img src="logo.jpg" alt="Logo" class="invoice-logo">
                    <div class="invoice-details">
                        <strong>${companyName}</strong><br>
                        ${companyServices}<br>
                        ${companyLegal}<br>
                        ${companyLocation}<br>
                        Tél: ${companyPhone}
                    </div>
                </div>
                <div class="invoice-title">
                    <h2>Relevé Compte Crédit</h2>
                    <div class="invoice-details">
                        Date émission: ${today}<br>
                        Date dernière op.: ${lastOpDate}<br>
                        Réf. Transac.: CRD-${originalIndex}-${Date.now().toString().slice(-5)}
                    </div>
                </div>
            </div>
            <hr>
            <div class="invoice-client-details">
                <strong>Client:</strong><br>
                ${cred.name || '-'}${clientAddress && clientAddress !== '-' ? `<br>Adresse: ${clientAddress}` : ''}${clientContact && clientContact !== '-' ? `<br>Contact: ${clientContact}` : ''}
            </div>
            <div class="invoice-items">
                <h4 style="margin-bottom: 5px;">Détail Transaction Initiale (Date: ${initialDate})</h4>
                <table>
                    <thead><tr><th class="designation-col">Désignation</th><th class="quantity-col">Qté</th><th class="unit-price-col amount">PU</th><th class="amount-col amount">Dû Initial</th></tr></thead>
                    <tbody><tr><td>${cred.designation || '-'}</td><td style="text-align:center;">${cred.quantity !== null ? cred.quantity : '-'}</td><td class="amount">${cred.unitPrice !== null ? formatAmount(cred.unitPrice) : '-'}</td><td class="amount">${formatAmount(totalDue)}</td></tr></tbody>
                </table>
            </div>
            <div class="invoice-summary">
                Total Dû Initial: <strong>${formatAmount(totalDue)}</strong><br style="clear: both;">
                Total Payé cumulé: <strong>${formatAmount(totalPaid)}</strong><br style="clear: both;">
                <hr>
                Solde Restant: <strong style="font-size: 1.1em; color: ${remaining <= 0.005 ? 'green' : 'red'};">${formatAmount(remaining)}</strong><br style="clear: both;">
                ${cred.dueDate ? `Date échéance prévue: <strong>${cred.dueDate}</strong><br style="clear: both;">` : ''}
            </div>
            <!-- ADDED SIGNATURE SECTION -->
            <div style="margin-top: 40px; text-align: right; padding-right: 30px;">
                Signature<br><br><br><br>
                <strong>${managerName}</strong>
            </div>
            <!-- END SIGNATURE SECTION -->
            <div class="invoice-footer">Relevé généré le ${today}. Merci de votre confiance.</div>`;
        // --- END HTML Generation ---

        invoiceArea.innerHTML = invoiceHTML;
        printElement('invoice-print-area');
    };

     /** Generates the HTML content for the invoice print area (MULTI-ITEM VERSION) */
     function generateInvoiceHTML(invoiceData) {
        // --- COMPANY INFO --- (Keep this part as is)
        const companyName = "La Charité Modeste";
        const companyServices = "TOUS TRAVAUX DE SECRETARIAT : Photocopie-Saisie, Tirage, Plastification-Vente Des fournitures scolaires – Vente des ampoules électriques Etc.....";
        const companyLegal = "N°RCCM: RB / PK 0/A5519 /IFU 0201810420946";
        const companyLocation = "PARAKOU (Rép Du Bénin)";
        const companyPhone = "61 71 36 92 / 64 41 58 95";
        const managerName = "Modeste KODA MICHEL";
        // --- END COMPANY INFO ---

        const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

        // Generate table rows for each item
        let itemsHTML = '';
        if (invoiceData.items && invoiceData.items.length > 0) {
            invoiceData.items.forEach(item => {
                itemsHTML += `
                    <tr>
                        <td>${item.designation || '-'}</td>
                        <td style="text-align:center;">${item.quantity || 0}</td>
                        <td class="amount">${formatAmount(item.unitPrice)}</td>
                        <td class="amount">${formatAmount(item.total)}</td>
                    </tr>
                `;
            });
        } else {
            itemsHTML = '<tr><td colspan="4" style="text-align:center;">Aucun article</td></tr>';
        }

        // --- HTML Generation (using the generated itemsHTML) ---
        return `
            <div class="invoice-header">
                 <div>
                     <!-- Using the preloaded logo.jpg -->
                    <img src="logo.jpg" alt="Logo" class="invoice-logo">
                    <div class="invoice-details">
                        <strong>${companyName}</strong><br>
                        ${companyServices}<br>
                        ${companyLegal}<br>
                        ${companyLocation}<br>
                        Tél: ${companyPhone}
                    </div>
                </div>
                <div class="invoice-title">
                    <h2>FACTURE</h2>
                    <div class="invoice-details">
                        Date Facture: ${invoiceData.date || '-'}<br>
                        N° Facture: ${invoiceData.number || '-'}<br>
                        Date émission: ${today}
                    </div>
                </div>
            </div>
            <hr>
            <div class="invoice-client-details">
                <strong>Client:</strong><br>
                ${invoiceData.clientName || '-'}${invoiceData.clientContact ? `<br>Contact: ${invoiceData.clientContact}` : ''}
            </div>
            <div class="invoice-items">
                <h4 style="margin-bottom: 5px;">Détail</h4>
                <table>
                    <thead><tr><th class="designation-col">Désignation</th><th class="quantity-col">Quantité</th><th class="unit-price-col amount">Prix Unitaire</th><th class="amount-col amount">Total Article</th></tr></thead>
                    <tbody>
                        ${itemsHTML}
                     </tbody>
                </table>
            </div>
            <div class="invoice-summary">
                Arrêté la présente facture à la somme de:<br>
                <span style="font-style: italic; display: block; margin: 5px 0;">${invoiceData.totalWords || '...'}</span>
                <hr>
                Montant Total: <strong style="font-size: 1.2em;">${formatAmount(invoiceData.totalAmount)}</strong><br style="clear: both;">
            </div>
            <!-- ADDED SIGNATURE SECTION -->
            <div style="margin-top: 40px; text-align: right; padding-right: 30px;">
                Signature<br><br><br><br>
                <strong>${managerName}</strong>
            </div>
            <!-- END SIGNATURE SECTION -->
            <div class="invoice-footer">Merci de votre confiance.</div>`;
        // --- END HTML Generation ---
    }

     // --- Invoice Generator Print Button Listener (MULTI-ITEM VERSION) ---
     if (previewPrintInvoiceButton) {
        previewPrintInvoiceButton.addEventListener('click', () => {
            if (!invoiceGenDateInput?.value || !invoiceGenClientNameInput?.value.trim() || !invoiceGenNumberInput?.value) {
                alert("Veuillez remplir les informations générales de la facture (Date, Client, N°).");
                return;
            }

            const items = [];
            const itemRows = invoiceItemsContainer?.querySelectorAll('.invoice-item-row'); // Use optional chaining
            let isValid = true;
            let calculatedGrandTotal = 0;

             // Clear previous validation styles
            invoiceItemsContainer?.querySelectorAll('input.invalid-field').forEach(input => input.classList.remove('invalid-field')); // Use class for styling


            if (!itemRows || itemRows.length === 0) {
                 alert("Veuillez ajouter au moins une ligne d'article.");
                 return;
            }

            itemRows.forEach((row, index) => {
                const designationInput = row.querySelector('.item-designation');
                const quantityInput = row.querySelector('.item-quantity');
                const unitPriceInput = row.querySelector('.item-unit-price');

                const designation = designationInput?.value.trim();
                const quantity = parseFloat(quantityInput?.value);
                const unitPrice = parseFloat(unitPriceInput?.value);

                 // Validate each field in the row
                 let rowIsValid = true;
                if (!designation) {
                    isValid = false; rowIsValid = false;
                    if(designationInput) designationInput.classList.add('invalid-field');
                } else {
                     if(designationInput) designationInput.classList.remove('invalid-field');
                 }
                 if (isNaN(quantity) || quantity < 0) { // Allow quantity 0? Change if needed.
                     isValid = false; rowIsValid = false;
                     if(quantityInput) quantityInput.classList.add('invalid-field');
                 } else {
                     if(quantityInput) quantityInput.classList.remove('invalid-field');
                 }
                 if (isNaN(unitPrice) || unitPrice < 0) {
                     isValid = false; rowIsValid = false;
                     if(unitPriceInput) unitPriceInput.classList.add('invalid-field');
                 } else {
                     if(unitPriceInput) unitPriceInput.classList.remove('invalid-field');
                 }

                 if (rowIsValid) {
                     const itemTotal = quantity * unitPrice;
                     items.push({
                        designation,
                        quantity,
                        unitPrice,
                        total: itemTotal
                     });
                     calculatedGrandTotal += itemTotal;
                 }
            });

            if (!isValid) {
                alert("Veuillez vérifier toutes les lignes d'articles. Chaque ligne doit avoir une désignation, une quantité >= 0 et un prix unitaire >= 0 valides (champs en rouge).");
                // Scroll to the first invalid field if desired
                 const firstInvalid = invoiceItemsContainer?.querySelector('.invalid-field');
                 firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            // Ensure the displayed total matches the calculated one (final update before print)
            calculateInvoiceTotal();
            const finalTotalAmount = parseFloat(invoiceGenTotalAmountInput.value); // Read the updated value


            const invoiceData = {
                date: invoiceGenDateInput.value,
                number: invoiceGenNumberInput.value,
                clientName: invoiceGenClientNameInput.value.trim(),
                clientContact: invoiceGenClientContactInput?.value.trim() || '',
                items: items, // The array of collected items
                totalAmount: finalTotalAmount, // Use the final calculated total
                totalWords: numberToWordsFrench(finalTotalAmount) // Use the final calculated total
            };

            const invoiceHTML = generateInvoiceHTML(invoiceData);
            const invoiceArea = document.getElementById('invoice-print-area');

            if (invoiceArea) {
                invoiceArea.innerHTML = invoiceHTML;
                printElement('invoice-print-area');
            } else {
                alert("Erreur: Zone impression facture introuvable.");
            }
        });
    }


    // --- Initialisation ---
    initializeApp(); // Call the initialization function

}); // End DOMContentLoaded