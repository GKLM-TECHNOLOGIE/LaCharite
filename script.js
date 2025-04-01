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

    // Buttons
    const showSupplySectionButton = document.getElementById('show-supply-section');
    const showSalesSectionButton = document.getElementById('show-sales-section');
    const showEmployeesSectionButton = document.getElementById('show-employees-section');
    const showLearnersSectionButton = document.getElementById('show-learners-section');
    const showMobileMoneySectionButton = document.getElementById('show-mobile-money-section');
    const showCreditorsSectionButton = document.getElementById('show-creditors-section');
    const showDebtSectionButton = document.getElementById('show-debt-section');
    const showReportSectionButton = document.getElementById('show-report-section');

    // Sections
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

    // Hidden edit fields
    const supplyEditIndexInput = document.getElementById('supply-edit-index');
    const employeeEditIndexInput = document.getElementById('employee-edit-index');
    const learnerEditIndexInput = document.getElementById('learner-edit-index');
    const mobileMoneyEditIndexInput = document.getElementById('mobile-money-edit-index');
    const mmFournisseurEditKeyInput = document.getElementById('mm-fournisseur-edit-key');
    const clientProfileEditKeyInput = document.getElementById('client-profile-edit-key');
    // const creditorEditIndexInput = document.getElementById('creditor-edit-index'); // Edit not implemented via form
    const debtEditIndexInput = document.getElementById('debt-edit-index');


    // --- Variables pour stocker les données (localStorage) ---
    const loadData = (key) => {
        try {
            const data = localStorage.getItem(key);
            const parsed = data ? JSON.parse(data) : [];
            // Basic validation: ensure it's an array
            if (!Array.isArray(parsed)) {
                console.warn(`Data for key '${key}' in localStorage was not an array. Resetting.`);
                localStorage.removeItem(key);
                return [];
            }
            return parsed;
        } catch (e) {
            console.error(`Erreur lors du chargement ou parsing des données pour ${key}:`, e);
            // Attempt to recover by removing the corrupted key
            localStorage.removeItem(key);
            return []; // Return empty array on error
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

        // Always use the up-to-date stockData
        if (category === 'Papeterie') {
            targetSelect = saleDesignationSelect;
            sourceData = stockData.filter(item => item.type === 'Papeterie' && item.remainingQuantity > 0);
        } else if (category === 'Matériels électrique') {
            targetSelect = meDesignationSelect;
            sourceData = stockData.filter(item => item.type === 'Matériels électrique' && item.remainingQuantity > 0);
        } else {
            // Clear both if category is not relevant
            if(saleDesignationSelect) saleDesignationSelect.innerHTML = '<option value="">-- Choisir --</option>';
            if(meDesignationSelect) meDesignationSelect.innerHTML = '<option value="">-- Choisir --</option>';
            return;
        }

        if (!targetSelect) return;

        // Get current value to try and preserve it
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
        totalAmountInput.value = formatAmount(quantity * unitPrice); // Use formatAmount
    }

     /** Calcule le montant total pour 'Divers'. */
    function calculateOtherTotalAmount() {
        if (!otherQuantityInput || !otherUnitPriceInput || !otherTotalAmountInput) return;
        const quantity = parseFloat(otherQuantityInput.value); // Allow NaN for direct amount entry
        const unitPriceOrAmount = parseFloat(otherUnitPriceInput.value) || 0;
        let totalAmount;
         // If quantity is empty, 0, or 1, treat unit price as the total amount
        if (isNaN(quantity) || quantity === 0 || quantity === 1) {
            totalAmount = unitPriceOrAmount;
        } else {
            totalAmount = quantity * unitPriceOrAmount;
        }
        otherTotalAmountInput.value = formatAmount(totalAmount); // Use formatAmount
    }

     /** Calcule le montant total dû pour le crédit client (Qté * PU). */
    function calculateCreditorTotalAmount() {
        if (creditorQuantityInput?.value && creditorUnitPriceInput?.value && creditorTotalAmountDueInput) {
            calculateTotalAmount(creditorQuantityInput, creditorUnitPriceInput, creditorTotalAmountDueInput);
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
            'report-date'
        ].forEach(id => {
                const element = document.getElementById(id);
                if (element && element.type === 'date' && !element.value) {
                    element.value = today;
                }
            });
        // Reset time inputs if needed
        ['employee-heure-arrivee', 'employee-heure-depart'].forEach(id => {
             const element = document.getElementById(id);
             if (element && !element.value) {
                  // element.value = '00:00'; // Set default if desired
             }
        });

        if (reportYearInput && !reportYearInput.value) reportYearInput.value = year;
        if(reportMonthInput && !reportMonthInput.value) reportMonthInput.value = `${year}-${month}`;
        if(reportWeekInput && !reportWeekInput.value){
            try {
                // Calculate ISO week number
                const currentThursday = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
                currentThursday.setUTCDate(currentThursday.getUTCDate() + 4 - (currentThursday.getUTCDay() || 7));
                const yearStart = new Date(Date.UTC(currentThursday.getUTCFullYear(), 0, 1));
                const weekNo = Math.ceil((((currentThursday - yearStart) / 86400000) + 1) / 7);
                const weekYear = currentThursday.getUTCFullYear();
                reportWeekInput.value = `${weekYear}-W${weekNo.toString().padStart(2,'0')}`;
            } catch (dateError) {
                console.error("Erreur calcul semaine par défaut:", dateError);
            }
        }
    }

    /** Affiche ou masque un élément. */
    function toggleVisibility(element) {
        if (element) {
            element.style.display = element.style.display === 'none' ? 'block' : 'none';
        }
    }

    /** Gère la visibilité exclusive des sous-sections Ventes/Divers (tables). */
    function toggleSalesSubSectionVisibility(containerToShow) {
        const allSalesSubSections = [ salesDetailsContainer, materielElectriqueDetailsContainer, expensesDetailsContainer, othersDetailsContainer ];
        allSalesSubSections.forEach(container => {
            if (container) {
                // If it's the one we want to show AND it's hidden, show it.
                // Otherwise, hide it.
                container.style.display = (container === containerToShow && container.style.display !== 'block') ? 'block' : 'none';
            }
        });
    }

    /** Affiche une section principale et masque les autres, ainsi que tous les détails. */
    function setSectionVisibility(sectionToShow, sectionsToHide) {
         if (!sectionToShow) return;
        sectionsToHide.forEach(section => { if(section) section.style.display = 'none'; });
        sectionToShow.style.display = 'block';

        // Hide all detail containers when switching main sections
        [
            supplyListContainer, stockDetailsContainer,
            salesDetailsContainer, materielElectriqueDetailsContainer, expensesDetailsContainer, othersDetailsContainer,
            employeesDetailsContainer, learnersDetailsContainer,
            mobileMoneyDetailsContainer, mmFournisseursDetailsContainer,
            clientProfilesContainer, creditorsDetailsContainer,
            debtDetailsContainer,
            reportDetailsContainer, reportFilters
        ].forEach(container => { if (container) container.style.display = 'none'; });

        // Hide report details button specifically
        if (showReportDetailsButton) showReportDetailsButton.style.display = 'none';
    }

    /** Gère l'affichage des sous-formulaires dans Ventes/Divers. */
    function handleOperationTypeChange() {
        if (!operationTypeSelect) return;
        const type = operationTypeSelect.value;
        const showPapeterie = (type === 'Papeterie');
        const showMaterielElectrique = (type === 'Matériels électrique');
        const showDepenses = (type === 'Dépenses');
        const showDivers = (type === 'Divers');

        if(papeterieDetailsForm) papeterieDetailsForm.style.display = showPapeterie ? 'flex' : 'none';
        if(materielElectriqueDetailsForm) materielElectriqueDetailsForm.style.display = showMaterielElectrique ? 'flex' : 'none';
        if(depensesDetailsForm) depensesDetailsForm.style.display = showDepenses ? 'flex' : 'none';
        if(diversDetailsForm) diversDetailsForm.style.display = showDivers ? 'flex' : 'none';

        // Update product dropdown only if the relevant section is shown
        if (showPapeterie) {
            updateProductDesignationsForCategory('Papeterie');
        } else if (showMaterielElectrique) {
            updateProductDesignationsForCategory('Matériels électrique');
        } else {
             // Clear dropdowns if neither stockable type is selected
            updateProductDesignationsForCategory('');
        }


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
        if (!containerToPrint) {
            console.error("Conteneur à imprimer non trouvé:", containerId);
            alert("Erreur: Impossible de trouver le contenu à imprimer.");
            return;
        }
        // Add class to body to activate general print styles from CSS
        document.body.classList.add('printing-active');
        // Add class to the specific container to make IT visible during print
        containerToPrint.classList.add('show-in-print');

        // Define a function to clean up classes after printing
        const afterPrintHandler = () => {
            document.body.classList.remove('printing-active');
            containerToPrint.classList.remove('show-in-print');
            // Remove the event listeners to prevent memory leaks
            window.removeEventListener('afterprint', afterPrintHandler);
            window.removeEventListener('unload', afterPrintHandler); // Use unload as a fallback for some browsers
        };

        // Add event listeners for after print
        window.addEventListener('afterprint', afterPrintHandler);
        window.addEventListener('unload', afterPrintHandler); // Fallback

        try {
            window.print();
             // Fallback timeout: Sometimes 'afterprint' might not fire reliably
             setTimeout(() => {
                 // Check if the classes are still there after a delay, and remove them if so
                 if (document.body.classList.contains('printing-active')) {
                     afterPrintHandler();
                 }
             }, 1500); // Adjust delay if needed
        } catch (e) {
            console.error("Erreur lors de l'appel à window.print():", e);
            alert("Une erreur s'est produite lors du lancement de l'impression.");
            afterPrintHandler(); // Clean up classes immediately on error
        }
    }

    /** Prépare le DOM pour l'impression d'INVOICE et lance l'impression système. */
    function printElement(elementId) {
        const elementToPrint = document.getElementById(elementId);
        if (!elementToPrint) {
            console.error("Element to print not found:", elementId);
            alert("Erreur: Impossible de trouver le contenu à imprimer.");
            return;
        }
        // Use specific class for invoice printing styles
        document.body.classList.add('printing-invoice'); // Different class for invoice styles
        elementToPrint.classList.add('show-in-print');
        elementToPrint.style.display = 'block'; // Ensure it's visible

        const afterPrintHandler = () => {
            document.body.classList.remove('printing-invoice');
            elementToPrint.classList.remove('show-in-print');
            elementToPrint.style.display = 'none'; // Hide invoice area again
            // Optionally clear the invoice area content after printing
            // elementToPrint.innerHTML = '';
            window.removeEventListener('afterprint', afterPrintHandler);
            window.removeEventListener('unload', afterPrintHandler);
        };
        window.addEventListener('afterprint', afterPrintHandler);
        window.addEventListener('unload', afterPrintHandler);

        try {
            window.print();
             // Fallback timeout
             setTimeout(() => {
                 if (document.body.classList.contains('printing-invoice')) {
                      afterPrintHandler();
                 }
             }, 1500);
        } catch (e) {
            console.error("Erreur lors de l'appel à window.print():", e);
            alert("Une erreur s'est produite lors du lancement de l'impression.");
            afterPrintHandler(); // Clean up on error
        }
    }


    /** Exporte une table HTML vers Excel. */
    function exportToExcel(tableId, fileName) {
        try {
            const table = document.getElementById(tableId);
            if (!table) throw new Error(`Tableau avec ID '${tableId}' non trouvé.`);
            if (typeof XLSX === 'undefined') throw new Error("Librairie XLSX non chargée.");

            // Clone table to remove actions column before export
            const tableClone = table.cloneNode(true);
            const actionHeaderIndex = Array.from(tableClone.querySelectorAll('thead th')).findIndex(th => th.textContent.trim().toLowerCase() === 'actions');

            if (actionHeaderIndex !== -1) {
                Array.from(tableClone.rows).forEach(row => {
                    if (row.cells.length > actionHeaderIndex) {
                        row.deleteCell(actionHeaderIndex);
                    }
                });
            }

            const worksheet = XLSX.utils.table_to_sheet(tableClone, { raw: true }); // Use the clone, use raw values

            // Auto-adjust column widths (basic implementation)
            const columnWidths = [];
            if (worksheet['!ref']) { // Check if sheet has data
                 const range = XLSX.utils.decode_range(worksheet['!ref']);
                 for (let C = range.s.c; C <= range.e.c; ++C) {
                     let maxLen = 0;
                     // Check header length first
                     const headerAddr = {c: C, r: range.s.r};
                     const headerRef = XLSX.utils.encode_cell(headerAddr);
                     if(worksheet[headerRef]) maxLen = String(worksheet[headerRef].v || '').length;

                     // Check cell lengths in body
                     for (let R = range.s.r + 1; R <= range.e.r; ++R) {
                         const cellAddress = { c: C, r: R };
                         const cellRef = XLSX.utils.encode_cell(cellAddress);
                         if (!worksheet[cellRef]) continue;
                         const cellText = worksheet[cellRef].v !== null && worksheet[cellRef].v !== undefined ? String(worksheet[cellRef].v) : '';
                         const textLength = cellText.length;
                         if (textLength > maxLen) {
                             maxLen = textLength;
                         }
                     }
                     // Add padding, ensure minimum width
                     columnWidths[C] = { wch: Math.max(10, maxLen + 3) }; // Increased padding
                 }
                 if (columnWidths.length > 0) worksheet['!cols'] = columnWidths;
            }

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Données");
            XLSX.writeFile(workbook, fileName || "Export.xlsx");
        } catch (error) {
            console.error("Erreur export Excel:", error);
            alert(`Erreur export Excel: ${error.message}`);
        }
    }

    /** Exporte une table HTML vers PDF. */
    function exportToPdf(tableId, fileName) {
        try {
            const table = document.getElementById(tableId);
            if (!table) throw new Error(`Tableau avec ID '${tableId}' non trouvé.`);
            const container = table.closest('.printable-content');
            const titleElement = container?.querySelector('h3');
            const title = titleElement ? titleElement.innerText : `Export PDF`;

            if (typeof jspdf === 'undefined' || !jspdf.jsPDF || typeof jspdf.plugin === 'undefined' || typeof jspdf.plugin.autotable === 'undefined') {
                throw new Error("Librairies PDF (jsPDF, jsPDF-AutoTable) non chargées correctement.");
            }
            const { jsPDF } = window.jspdf; // Correct way to access jsPDF constructor

             // Find action column index to ignore during export
             const actionHeaderIndex = Array.from(table.querySelectorAll('thead th')).findIndex(th => th.textContent.trim().toLowerCase() === 'actions');

             // Get headers excluding the action column
             const headers = Array.from(table.querySelectorAll('thead th'))
                                .filter((_, index) => index !== actionHeaderIndex)
                                .map(th => th.innerText.trim());

            const colCount = headers.length; // Count columns actually exported
            const orientation = colCount > 7 ? "landscape" : "portrait"; // Adjust orientation based on exported columns
            const doc = new jsPDF({ orientation: orientation, unit: "pt", format: "a4" });

            doc.setFontSize(14);
            doc.text(title, 40, 40); // Use dynamic title

            // Use html-to-autotable method if available and simpler
             doc.autoTable({
                 html: `#${tableId}`, // Target the table ID
                 startY: 60,
                 theme: 'grid',
                 headStyles: { fillColor: [0, 123, 255], textColor: 255, halign: 'center' },
                 styles: { fontSize: orientation === "landscape" ? 7 : 8, cellPadding: 3, overflow: 'linebreak' },
                 margin: { top: 60, right: 30, bottom: 40, left: 30 },
                 tableWidth: 'auto', // Fit content or page width
                 // Remove the actions column before processing
                 columns: Array.from(table.querySelectorAll('thead th'))
                           .map((th, index) => index) // Get all indices
                           .filter(index => index !== actionHeaderIndex), // Exclude action index
                 didParseCell: function(data) {
                     // Numeric alignment based on original column classes (more robust)
                     if (data.cell.section === 'body' && data.column.index !== undefined) {
                         // Find the corresponding original header cell
                         let originalColIndex = -1;
                         let currentExportedCol = -1;
                         for(let i = 0; i < table.rows[0].cells.length; i++) {
                             if (i !== actionHeaderIndex) {
                                 currentExportedCol++;
                                 if (currentExportedCol === data.column.index) {
                                     originalColIndex = i;
                                     break;
                                 }
                             }
                         }

                         if (originalColIndex !== -1) {
                             const originalHeaderCell = table.rows[0].cells[originalColIndex];
                             const headerClasses = originalHeaderCell.classList;

                             if (headerClasses.contains('unit-price-col') ||
                                 headerClasses.contains('salary-col') ||
                                 headerClasses.contains('amount-col') ||
                                 headerClasses.contains('balance-col') || // MM
                                 headerClasses.contains('credit-col')) { // MM
                                 data.cell.styles.halign = 'right';
                             } else if (headerClasses.contains('quantity-col') ||
                                        headerClasses.contains('supply-col') ||
                                        headerClasses.contains('sold-col') ||
                                        headerClasses.contains('remaining-col') ||
                                        headerClasses.contains('age-col')) {
                                 data.cell.styles.halign = 'center';
                             } else {
                                  data.cell.styles.halign = 'left';
                             }
                         }
                     }
                 }
             });

            doc.save(fileName || 'Export.pdf');
        } catch (error) {
            console.error("Erreur export PDF:", error);
            alert(`Erreur export PDF: ${error.message}`);
        }
    }


    /** Calcule la date du lundi pour une semaine ISO. */
    function getDateOfISOWeek(w, y) {
         if (isNaN(w) || isNaN(y) || w < 1 || w > 53) return new Date(NaN);
         try {
             // Use Jan 4th as the reference date within the first week of the year.
             const simpleDate = new Date(Date.UTC(y, 0, 4));
             const dayOfWeekJan4 = simpleDate.getUTCDay() || 7; // Make Sunday 7

             // Calculate the date of the Monday of week 1.
             const mondayOfWeek1 = new Date(simpleDate);
             mondayOfWeek1.setUTCDate(simpleDate.getUTCDate() - dayOfWeekJan4 + 1);

             // Calculate the target Monday by adding weeks to Monday of week 1.
             const targetMonday = new Date(mondayOfWeek1);
             targetMonday.setUTCDate(mondayOfWeek1.getUTCDate() + (w - 1) * 7);

             // Verify the year of the calculated Monday's week (using Thursday)
             const thursdayOfWeek = new Date(targetMonday);
             thursdayOfWeek.setUTCDate(targetMonday.getUTCDate() + 3); // Thursday is always in the same ISO week
             if (thursdayOfWeek.getUTCFullYear() !== y) {
                 console.warn(`Calculated start date for week ${w}, ${y} falls into year ${thursdayOfWeek.getUTCFullYear()}. Returning potentially incorrect date.`);
                 // Return the calculated Monday even if the year check fails, as per ISO 8601 logic,
                 // but the warning indicates potential user confusion or edge cases (like week 53).
             }

             return targetMonday;
         } catch(e) {
             console.error(`Erreur getDateOfISOWeek(${w}, ${y}):`, e);
             return new Date(NaN); // Return invalid date on error
         }
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
                <button class="action-btn edit-btn" title="Modifier" onclick="editSupply(${index})">✏️</button>
                <button class="action-btn delete-btn" title="Supprimer" onclick="deleteSupply(${index})">❌</button>
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
            actionCell.innerHTML = `
                <button class="action-btn delete-btn" title="Supprimer Vente Papeterie" onclick="deleteSale(${index})">❌</button>
            `; // Edit skipped for complexity, focuses on delete for sales reversal
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
            actionCell.innerHTML = `
                <button class="action-btn delete-btn" title="Supprimer Vente Mat. Elec." onclick="deleteMaterielElectriqueSale(${index})">❌</button>
            `; // Edit skipped
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
            actionCell.innerHTML = `
                <button class="action-btn delete-btn" title="Supprimer Dépense" onclick="deleteExpense(${index})">❌</button>
            `; // Edit skipped
        });
    }

    function updateOthersTable() { // Divers
        if (!othersTable) return;
        othersTable.innerHTML = '';
        othersData.forEach((other, index) => {
            const row = othersTable.insertRow();
            row.insertCell().textContent = other.date || '-';
            row.insertCell().textContent = other.designation || '-';
            // Display quantity as 1 if it was entered as a direct amount (logic in form submit)
            const quantityDisplay = other.quantity !== null ? other.quantity : '-';
            const quantityCell = row.insertCell(); quantityCell.textContent = quantityDisplay; quantityCell.classList.add('quantity-col');
            const priceCell = row.insertCell(); priceCell.textContent = formatAmount(other.unitPrice); priceCell.classList.add('unit-price-col'); // PU/Montant
            const totalCell = row.insertCell(); totalCell.textContent = formatAmount(other.totalAmount); totalCell.classList.add('amount-col');
             const actionCell = row.insertCell(); actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `
                <button class="action-btn delete-btn" title="Supprimer Opération Diverse" onclick="deleteOther(${index})">❌</button>
            `; // Edit skipped
        });
    }

    function updateStockTable() {
        if (!stockTable) return;
        stockData = calculateStock(supplyData, salesData, materielElectriqueData);
        stockTable.innerHTML = '';
        stockData.forEach(stock => {
            const row = stockTable.insertRow();
            row.insertCell().textContent = stock.type || '-';
            row.insertCell().textContent = stock.date || '-'; // Date of last modification affecting this item
            row.insertCell().textContent = stock.designation || '-';
            const supplyQtyCell = row.insertCell(); supplyQtyCell.textContent = stock.supplyQuantity || 0; supplyQtyCell.classList.add('supply-col');
            const soldQtyCell = row.insertCell(); soldQtyCell.textContent = stock.soldQuantity || 0; soldQtyCell.classList.add('sold-col');
            const remainingQtyCell = row.insertCell(); remainingQtyCell.textContent = stock.remainingQuantity || 0; remainingQtyCell.classList.add('remaining-col');

            // Visual indicator for stock levels
            row.style.backgroundColor = ''; row.style.color = ''; // Reset styles
            const remaining = stock.remainingQuantity || 0;
            if (remaining <= 0) { row.style.backgroundColor = '#f8d7da'; row.style.color = '#721c24'; } // Reddish for out of stock
            else if (remaining < 5) { row.style.backgroundColor = '#fff3cd'; row.style.color = '#856404'; } // Yellowish for low stock (threshold = 5)
            // No actions column needed here
        });
         // Update dropdowns that depend on stock *after* stock table is updated
         updateProductDesignationsForCategory('Papeterie');
         updateProductDesignationsForCategory('Matériels électrique');
    }

    function calculateStock(supply, papeterieSales, meSales) {
        let stock = {}; // Use designation as key for efficient lookup

        // 1. Process Supplies
        supply.forEach(item => {
            const key = item.designation?.trim(); // Ensure key is trimmed
            // Only process stockable types with a valid designation
            if (!key || (item.type !== 'Papeterie' && item.type !== 'Matériels électrique')) return;

            const quantity = parseFloat(item.quantity) || 0;
            if (quantity <= 0) return; // Ignore zero or negative supply

            if (!stock[key]) {
                // Initialize if first time seeing this designation
                stock[key] = {
                    designation: key,
                    type: item.type,
                    supplyQuantity: 0,
                    soldQuantity: 0,
                    remainingQuantity: 0,
                    date: item.date // Use date of first supply initially
                };
            } else if (stock[key].type !== item.type) {
                // Handle potential conflict if same designation exists under different stockable type
                console.warn(`Stock Calculation: Désignation '${key}' trouvée dans ${stock[key].type}, mais nouvel approvisionnement est de type ${item.type}. L'approvisionnement est ignoré pour éviter les incohérences de stock.`);
                return; // Skip this supply item
            }

            // Update quantities and last modification date
            stock[key].supplyQuantity += quantity;
            stock[key].remainingQuantity += quantity;
            // Keep the latest date associated with this item (supply or sale)
            if (!stock[key].date || (item.date && new Date(item.date) > new Date(stock[key].date))) {
                stock[key].date = item.date;
            }
        });

        // 2. Process Sales (combine papeterie and ME sales)
        const allStockableSales = [...papeterieSales, ...meSales];
        allStockableSales.forEach(item => {
            const key = item.designation?.trim();
            if (!key) return; // Ignore sales without designation

            const quantity = parseFloat(item.quantity) || 0;
            if (quantity <= 0) return; // Ignore zero or negative sales

            if (stock[key]) {
                // If stock item exists
                 if (stock[key].type !== item.type) {
                     // Sale type doesn't match stock type - log warning and ignore sale for stock calculation
                     console.warn(`Stock Calculation: Vente de '${key}' (type ${item.type}) ne correspond pas au type stocké (${stock[key].type}). Vente ignorée pour le calcul du stock.`);
                     return;
                 }
                // Update sold quantity and remaining quantity
                stock[key].soldQuantity += quantity;
                stock[key].remainingQuantity -= quantity;

                // Update last modification date if sale date is later
                if (!stock[key].date || (item.date && new Date(item.date) > new Date(stock[key].date))) {
                    stock[key].date = item.date;
                }
                 // Correct potential floating point inaccuracies near zero
                 if (Math.abs(stock[key].remainingQuantity) < 0.001) {
                     stock[key].remainingQuantity = 0;
                 }

            } else {
                // Sale recorded for an item not found in supply - this indicates an issue
                console.warn(`Stock Calculation: Vente pour '${key}' (${item.type}) sans approvisionnement correspondant enregistré.`);
                // Create a stock entry showing negative stock to highlight the discrepancy
                stock[key] = {
                    designation: key,
                    type: item.type,
                    supplyQuantity: 0,
                    soldQuantity: quantity,
                    remainingQuantity: -quantity, // Negative stock
                    date: item.date
                };
            }
        });

        // Convert stock object back to array and sort by type, then designation
        return Object.values(stock).sort((a, b) => {
             const typeCompare = (a.type || '').localeCompare(b.type || '');
             if (typeCompare !== 0) return typeCompare;
             return (a.designation || '').localeCompare(b.designation || '');
         });
    }

    function updateEmployeesTable() {
        if (!employeesTable) return;
        employeesTable.innerHTML = '';
        employeesData.forEach((employee, index) => {
            const row = employeesTable.insertRow();
            row.insertCell().textContent = employee.nom || '-';
            row.insertCell().textContent = employee.prenom || '-';
            row.insertCell().textContent = employee.statut || '-';
            row.insertCell().textContent = employee.hireDate || '-';
            row.insertCell().textContent = employee.adresse || '-';
            row.insertCell().textContent = employee.telephone || '-';
            row.insertCell().textContent = employee.lieuResidence || '-';
            row.insertCell().textContent = employee.joursTravail || '-';
            row.insertCell().textContent = employee.heureArrivee || '-';
            row.insertCell().textContent = employee.heureDepart || '-';

            const salary = employee.salary !== null ? parseFloat(employee.salary) : 0; // Treat null salary as 0 for calc
            const paidAmount = employee.paidAmount || 0;
            const remainingSalary = salary - paidAmount;

            let salaryCell = row.insertCell(); salaryCell.textContent = formatAmount(salary); salaryCell.classList.add('salary-col');
            let paidCell = row.insertCell(); paidCell.textContent = formatAmount(paidAmount); paidCell.classList.add('amount-col');
            let remainingCell = row.insertCell(); remainingCell.textContent = formatAmount(remainingSalary); remainingCell.classList.add('amount-col');

            row.insertCell().textContent = `${employee.contactPersonNom || ''} ${employee.contactPersonPrenom || ''}`.trim() || '-';
            row.insertCell().textContent = employee.contactPersonTelephone || '-';

            // Style remaining salary cell
            remainingCell.style.fontWeight = 'bold';
            if (remainingSalary <= 0.005) { // Use small tolerance for floating point
                 remainingCell.style.color = 'green';
            } else if (paidAmount > 0) {
                 remainingCell.style.color = 'orange';
            } else {
                 remainingCell.style.color = 'red';
            }

             // Actions Cell
            const actionCell = row.insertCell();
            actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" title="Modifier Employé" onclick="editEmployee(${index})">✏️</button>
                 <button class="action-btn pay-btn" title="Enregistrer Paiement Salaire" onclick="recordSalaryPayment(${index})">💲</button>
                 <button class="action-btn delete-btn" title="Supprimer Employé" onclick="deleteEmployee(${index})">❌</button>
            `;
        });
    }

    function updateLearnersTable() {
        if (!learnersTable) return;
        learnersTable.innerHTML = '';
        learnersData.forEach((learner, index) => {
            const row = learnersTable.insertRow();
            row.insertCell().textContent = learner.nom || '-';
            row.insertCell().textContent = learner.prenom || '-';
            row.insertCell().textContent = learner.age || '-';
            row.insertCell().textContent = learner.adresse || '-';
            row.insertCell().textContent = learner.lieuResidence || '-';
            row.insertCell().textContent = learner.niveauEtudes || '-';
            row.insertCell().textContent = learner.situationMatrimoniale || '-';
            row.insertCell().textContent = `${learner.pereNom || ''} ${learner.perePrenom || ''}`.trim() || '-';
            row.insertCell().textContent = `${learner.mereNom || ''} ${learner.merePrenom || ''}`.trim() || '-';
            row.insertCell().textContent = learner.filiere || '-';
            row.insertCell().textContent = learner.dureeFormation || '-';
            let cellDocs = row.insertCell(); cellDocs.textContent = formatAmount(learner.fraisDocuments); cellDocs.classList.add('amount-col');
            let cellT1 = row.insertCell(); cellT1.textContent = formatAmount(learner.tranche1); cellT1.classList.add('amount-col');
            let cellT2 = row.insertCell(); cellT2.textContent = formatAmount(learner.tranche2); cellT2.classList.add('amount-col');
            let cellT3 = row.insertCell(); cellT3.textContent = formatAmount(learner.tranche3); cellT3.classList.add('amount-col');
            let cellT4 = row.insertCell(); cellT4.textContent = formatAmount(learner.tranche4); cellT4.classList.add('amount-col');
            row.insertCell().textContent = `${learner.garantNom || ''} ${learner.garantPrenom || ''}`.trim() || '-';
            row.insertCell().textContent = learner.garantTelephone || '-';
            row.insertCell().textContent = learner.garantAdresse || '-';

             // Actions Cell
             const actionCell = row.insertCell();
             actionCell.classList.add('actions-cell');
             actionCell.innerHTML = `
                 <button class="action-btn edit-btn" title="Modifier Apprenant" onclick="editLearner(${index})">✏️</button>
                 <button class="action-btn pay-btn" title="Enregistrer Paiement Tranche" onclick="recordTranchePayment(${index})">💲</button>
                 <button class="action-btn delete-btn" title="Supprimer Apprenant" onclick="deleteLearner(${index})">❌</button>
             `;
        });
    }

    function updateMobileMoneyTable() { // Points Journaliers MM
        if (!mobileMoneyTable) return;
        mobileMoneyTable.innerHTML = '';
        const sortedMMData = [...mobileMoneyData].sort((a, b) => (b.date || '').localeCompare(a.date || '')); // Sort by date descending

        sortedMMData.forEach((transaction) => { // Don't need displayIndex here
            const row = mobileMoneyTable.insertRow();
            const balanceMoov = transaction.balanceMoov || 0, balanceMTN = transaction.balanceMTN || 0, balanceCelttis = transaction.balanceCelttis || 0, balanceCash = transaction.balanceCash || 0;
            const creditMoov = transaction.creditMoov || 0, creditMTN = transaction.creditMTN || 0, creditCelttis = transaction.creditCelttis || 0;
            const perteTransfert = transaction.perteTransfert || 0;
            const perteCredit = transaction.perteCredit || 0;
            const totalBalance = balanceMoov + balanceMTN + balanceCelttis + balanceCash;
            const totalCredit = creditMoov + creditMTN + creditCelttis;

            row.insertCell().textContent = transaction.date || '-';
            row.insertCell().textContent = transaction.agent || '-';
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

            // Actions Cell - Need to find the original index in the unsorted array
            const originalIndex = mobileMoneyData.findIndex(item =>
                 // Assuming date + agent is unique enough for a daily entry for finding original index
                 item.date === transaction.date && item.agent === transaction.agent
                 // Add more fields if needed for stricter uniqueness check
             );

            const actionCell = row.insertCell();
            actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" title="Modifier Point MM" onclick="editMobileMoney(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>✏️</button>
                 <button class="action-btn delete-btn" title="Supprimer Point MM" onclick="deleteMobileMoney(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>❌</button>
             `;
        });
    }

    function updateMmFournisseursTable() {
        if (!mmFournisseursTable) return;
        mmFournisseursTable.innerHTML = '';
         const sortedFournisseurs = [...mmFournisseursData].sort((a, b) => {
             const nameCompare = (a.nom || '').localeCompare(b.nom || '');
             if (nameCompare !== 0) return nameCompare;
             return (a.prenom || '').localeCompare(b.prenom || '');
         });

        sortedFournisseurs.forEach(f => {
            const row = mmFournisseursTable.insertRow();
            const montantFourni = f.montantFourni || 0;
            const creditVendu = f.creditVendu || 0;
            const creditRestant = montantFourni - creditVendu;

            row.insertCell().textContent = f.nom || '-';
            row.insertCell().textContent = f.prenom || '-';
            row.insertCell().textContent = f.contact || '-';
            let cellMF = row.insertCell(); cellMF.textContent = formatAmount(montantFourni); cellMF.classList.add('amount-col');
            let cellI = row.insertCell(); cellI.textContent = (f.interet !== null && f.interet !== undefined) ? `${f.interet}%` : '-'; cellI.style.textAlign = 'center';
            let cellCV = row.insertCell(); cellCV.textContent = formatAmount(creditVendu); cellCV.classList.add('amount-col');
            let cellCR = row.insertCell(); cellCR.textContent = formatAmount(creditRestant); cellCR.classList.add('amount-col'); cellCR.style.fontWeight = 'bold';
            cellCR.style.color = creditRestant <= 0.005 ? 'green' : 'red';

            // Actions Cell
            const actionCell = row.insertCell();
            actionCell.classList.add('actions-cell');
             // Escape quotes in names for onclick attribute string literal
             const safeNom = (f.nom || '').replace(/'/g, "\\'");
             const safePrenom = (f.prenom || '').replace(/'/g, "\\'");
            actionCell.innerHTML = `
                <button class="action-btn edit-btn" title="Modifier Fournisseur" onclick="editMmFournisseur('${safeNom}', '${safePrenom}')">✏️</button>
                <button class="action-btn delete-btn" title="Supprimer Fournisseur" onclick="deleteMmFournisseur('${safeNom}', '${safePrenom}')">❌</button>
            `;
        });
    }

    function updateClientProfilesTable() {
        if (!clientProfilesTable) return;
        clientProfilesTable.innerHTML = '';
        const sortedProfiles = [...clientProfilesData].sort((a, b) => {
            const nameCompare = (a.nom || '').localeCompare(b.nom || '');
            if (nameCompare !== 0) return nameCompare;
            return (a.prenom || '').localeCompare(b.prenom || '');
        });

        sortedProfiles.forEach(p => {
            const row = clientProfilesTable.insertRow();
            row.insertCell().textContent = p.nom || '-';
            row.insertCell().textContent = p.prenom || '-';
            row.insertCell().textContent = p.adresse || '-';
            row.insertCell().textContent = p.contact || '-';
            row.insertCell().textContent = p.statut || '-';
            // Actions Cell
            const actionCell = row.insertCell();
            actionCell.classList.add('actions-cell');
            const safeNom = (p.nom || '').replace(/'/g, "\\'");
            const safePrenom = (p.prenom || '').replace(/'/g, "\\'");
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" title="Modifier Profil" onclick="editClientProfile('${safeNom}', '${safePrenom}')">✏️</button>
                 <button class="action-btn delete-btn" title="Supprimer Profil" onclick="deleteClientProfile('${safeNom}', '${safePrenom}')">❌</button>
            `;
        });
    }

    function populateClientSelect() {
        if (!creditorNameSelect) return;
        const previousValue = creditorNameSelect.value; // Save current selection
        creditorNameSelect.innerHTML = '<option value="">-- Choisir Client --</option>'; // Clear existing options

         const sortedProfiles = [...clientProfilesData].sort((a, b) => {
            const nameCompare = (a.nom || '').localeCompare(b.nom || '');
            if (nameCompare !== 0) return nameCompare;
            return (a.prenom || '').localeCompare(b.prenom || '');
        });

        sortedProfiles.forEach(profile => {
            const option = document.createElement('option');
            const fullName = `${profile.nom || ''} ${profile.prenom || ''}`.trim();
            option.value = fullName; // Value is the full name
            option.textContent = fullName + (profile.contact ? ` (${profile.contact})` : ''); // Display name + contact
            option.dataset.contact = profile.contact || ''; // Store contact in data attribute
            creditorNameSelect.appendChild(option);
        });

        // Try to restore previous selection if it still exists
         if (Array.from(creditorNameSelect.options).some(opt => opt.value === previousValue)) {
             creditorNameSelect.value = previousValue;
         } else {
             creditorNameSelect.selectedIndex = 0; // Default to "Choisir" if previous value gone
         }
         // Trigger change event manually to update the contact field based on the (potentially restored) selection
         creditorNameSelect.dispatchEvent(new Event('change'));
    }

    function updateCreditorsTable() {
        if (!creditorsTable) return;
        creditorsTable.innerHTML = '';
        // Sort by status (not solde first), then name, then designation
        const sortedCreditors = [...creditorsData].sort((a, b) => {
             const aTotal = a.totalAmountDue || 0; const aPaid = a.amountPaidTotal || 0; const aRemaining = aTotal - aPaid;
             const bTotal = b.totalAmountDue || 0; const bPaid = b.amountPaidTotal || 0; const bRemaining = bTotal - bPaid;
            const aSolde = (aRemaining <= 0.005); const bSolde = (bRemaining <= 0.005);
            // Prioritize not solde (items with remaining balance first)
             if (aSolde !== bSolde) return aSolde ? 1 : -1; // Solde items go last
             // Then by name
            const nameCompare = (a.name || '').localeCompare(b.name || '');
            if (nameCompare !== 0) return nameCompare;
             // Then by designation
            return (a.designation || '').localeCompare(b.designation || '');
        });

        sortedCreditors.forEach((creditor) => { // No displayIndex needed here
            const row = creditorsTable.insertRow();
            const totalAmount = creditor.totalAmountDue || 0;
            const amountPaid = creditor.amountPaidTotal || 0;
            const remaining = totalAmount - amountPaid;
            const isSolde = remaining <= 0.005; // Tolerance for floating point

            // Dynamically find the client profile to get the latest contact info
            const clientProfile = clientProfilesData.find(p => `${p.nom || ''} ${p.prenom || ''}`.trim() === creditor.name);
            const contactDisplay = clientProfile ? clientProfile.contact : (creditor.contact || '-'); // Use profile contact if available

            row.insertCell().textContent = creditor.lastPaymentDate || creditor.date || '-'; // Date of last op
            row.insertCell().textContent = creditor.name || '-';
            row.insertCell().textContent = creditor.designation || '-';
            const quantityCell = row.insertCell(); quantityCell.textContent = creditor.quantity !== null ? creditor.quantity : '-'; quantityCell.classList.add('quantity-col');
            const unitPriceCell = row.insertCell(); unitPriceCell.textContent = creditor.unitPrice !== null ? formatAmount(creditor.unitPrice) : '-'; unitPriceCell.classList.add('unit-price-col');
            let cellTotal = row.insertCell(); cellTotal.textContent = formatAmount(totalAmount); cellTotal.classList.add('amount-col');
            let cellPaid = row.insertCell(); cellPaid.textContent = formatAmount(amountPaid); cellPaid.classList.add('amount-col');
            let cellRemaining = row.insertCell(); cellRemaining.textContent = formatAmount(remaining); cellRemaining.classList.add('amount-col'); cellRemaining.style.fontWeight = 'bold';
            row.insertCell().textContent = creditor.dueDate || '-';
            row.insertCell().textContent = contactDisplay; // Show dynamic contact
            const statusCell = row.insertCell(); statusCell.textContent = isSolde ? 'Soldé' : 'En cours'; statusCell.classList.add('status-col');

            row.classList.toggle('solde', isSolde);
            row.classList.toggle('partiel', !isSolde && amountPaid > 0); // Add class if partially paid
            cellRemaining.style.color = isSolde ? 'green' : (amountPaid > 0 ? 'orange' : 'red');

             // Actions Cell - Need original index
             const originalIndex = creditorsData.findIndex(item =>
                 // Use a combination of fields likely to be unique for the *initial* transaction
                 item.date === creditor.date &&
                 item.name === creditor.name &&
                 item.designation === creditor.designation &&
                 item.totalAmountDue === creditor.totalAmountDue // Add total due for more uniqueness
             );

             const actionCell = row.insertCell();
             actionCell.classList.add('actions-cell');
             actionCell.innerHTML = `
                  <button class="action-btn invoice-btn" title="Imprimer Relevé/Reçu" onclick="printCreditReceipt(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>🧾</button>
                  <button class="action-btn delete-btn" title="Supprimer Transaction (Irréversible!)" onclick="deleteCreditor(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>❌</button>
             `; // Edit skipped - handled via payment submission
        });
    }

    function updateDebtTable() {
        if (!debtTable) return;
        debtTable.innerHTML = '';
        const statusOrder = { "En cours": 1, "Partiellement Remboursé / Récupéré": 2, "Remboursé / Récupéré": 3, "Annulé": 4 };
        // Sort by status, then due date (earliest first), then name
        const sortedDebts = [...debtData].sort((a, b) => {
            const statusCompare = (statusOrder[a.status] || 99) - (statusOrder[b.status] || 99);
            if (statusCompare !== 0) return statusCompare;
            // Due Date comparison (handle missing/invalid dates)
            const dateA = a.dueDate ? new Date(a.dueDate) : null; const dateB = b.dueDate ? new Date(b.dueDate) : null;
            const validA = dateA && !isNaN(dateA); const validB = dateB && !isNaN(dateB);
            if (validA && validB) { if (dateA < dateB) return -1; if (dateA > dateB) return 1; }
            else if (validA) { return -1; } // Valid dates come first
            else if (validB) { return 1; }
            // Then by name
            return (a.name || '').localeCompare(b.name || '');
        });

        sortedDebts.forEach((debt) => { // No displayIndex needed
            const row = debtTable.insertRow();
            row.insertCell().textContent = debt.date || '-';
            row.insertCell().textContent = debt.type || '-';
            row.insertCell().textContent = debt.name || '-';
            row.insertCell().textContent = debt.description || '-';
            const amountCell = row.insertCell(); amountCell.textContent = formatAmount(debt.amount); amountCell.classList.add('amount-col');
            row.insertCell().textContent = debt.dueDate || '-';
            row.insertCell().textContent = debt.status || '-';

            row.classList.toggle('solde', debt.status === 'Remboursé / Récupéré');
            row.classList.toggle('partiel', debt.status === 'Partiellement Remboursé / Récupéré');

             // Actions Cell - Need original index
             const originalIndex = debtData.findIndex(item =>
                 // Assume unique combo of date, type, name, desc, amount for finding original index
                 item.date === debt.date &&
                 item.type === debt.type &&
                 item.name === debt.name &&
                 item.description === debt.description &&
                 item.amount === debt.amount
             );

            const actionCell = row.insertCell();
            actionCell.classList.add('actions-cell');
            actionCell.innerHTML = `
                 <button class="action-btn edit-btn" title="Modifier Dette/Prêt" onclick="editDebt(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>✏️</button>
                 <button class="action-btn delete-btn" title="Supprimer Dette/Prêt" onclick="deleteDebt(${originalIndex})" ${originalIndex === -1 ? 'disabled' : ''}>❌</button>
            `;
        });
    }

    /** Initialise l'application. */
    function initializeData() {
        console.log("Initialisation...");
        setTodaysDate();
        // Calculate stock first as other updates depend on it
        updateStockTable(); // This calculates stockData and updates product dropdowns
        // Then update tables and remaining dropdowns
        updateSupplyTable();
        updateSalesTable();
        updateMaterielElectriqueTable();
        updateExpensesTable();
        updateOthersTable();
        updateEmployeesTable();
        updateLearnersTable();
        updateMobileMoneyTable();
        updateMmFournisseursTable();
        updateClientProfilesTable();
        populateClientSelect(); // Needs profiles loaded
        updateCreditorsTable(); // Needs profiles loaded
        updateDebtTable();
        handleOperationTypeChange(); // Set initial visibility of sales sub-forms
        console.log("Initialisation terminée.");
    }

    // --- Gestionnaires d'événements pour la soumission des formulaires ---

    if(supplyForm) supplyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = supplyEditIndexInput ? parseInt(supplyEditIndexInput.value, 10) : -1;

        // Use constants defined earlier
        if (!supplyDateInput || !supplyTypeSelect || !supplyDesignationInput || !supplyQuantityInput || !supplyUnitPriceInput || !supplyTotalAmountInput) { alert("Erreur interne: Champs appro. manquants."); return; }

        const date = supplyDateInput.value;
        const type = supplyTypeSelect.value;
        const designation = supplyDesignationInput.value.trim();
        const quantity = parseFloat(supplyQuantityInput.value);
        const unitPrice = parseFloat(supplyUnitPriceInput.value);
        const totalAmount = parseFloat(supplyTotalAmountInput.value); // Get calculated value

        if (!date || !type || !designation || isNaN(quantity) || quantity <= 0 || isNaN(unitPrice) || unitPrice < 0 || isNaN(totalAmount)) { alert("Veuillez remplir correctement tous les champs d'approvisionnement (Date, Type, Désignation, Qté > 0, PU >= 0)."); return; }

        const isStockableType = (type === 'Papeterie' || type === 'Matériels électrique');
        let originalStockableStatus = false;
        let requiresStockUpdate = false;

        // Check for conflicting designation/type only if it's a stockable type
        if (isStockableType) {
            const conflictingItem = supplyData.find((item, index) =>
                item.designation === designation &&
                item.type !== type && // Different type
                (item.type === 'Papeterie' || item.type === 'Matériels électrique') && // Conflicting item is also stockable
                index !== editIndex // Exclude self during edit
            );
            if (conflictingItem) { alert(`Attention : La désignation "${designation}" existe déjà pour le type stockable "${conflictingItem.type}". Choisissez une désignation unique ou corrigez le type.`); return; }
        }

        const newData = { date, type, designation, quantity, unitPrice, totalAmount };

        if (editIndex > -1 && editIndex < supplyData.length) {
            const originalItem = supplyData[editIndex];
            originalStockableStatus = originalItem.type === 'Papeterie' || originalItem.type === 'Matériels électrique';
            // Update required if designation, type, or quantity changed for a stockable item
            requiresStockUpdate = (isStockableType || originalStockableStatus) &&
                                  (originalItem.designation !== designation || originalItem.type !== type || originalItem.quantity !== quantity);

            supplyData[editIndex] = newData;
            alert('Approvisionnement mis à jour.');
        } else {
            supplyData.push(newData);
            alert('Approvisionnement ajouté.');
            requiresStockUpdate = isStockableType; // Requires update if new item is stockable
        }

        localStorage.setItem('supplyData', JSON.stringify(supplyData));
        updateSupplyTable();

        if (requiresStockUpdate) {
            updateStockTable(); // This will also update dropdowns inside it
        }

        supplyForm.reset(); setTodaysDate();
        if(supplyEditIndexInput) supplyEditIndexInput.value = ''; // Clear edit index
        supplyForm.querySelector('button[type="submit"]').textContent = 'Ajouter Approvisionnement';
    });


    if(salesForm) salesForm.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!saleDateInput?.value) { alert("La date est requise."); return; }
        const date = saleDateInput.value;
        const operationType = operationTypeSelect.value;
        let dataUpdated = false; let needsStockUpdate = false;
        try {
            if (operationType === 'Papeterie') {
                const designation = saleDesignationSelect.value; if (!designation) throw new Error("Sélectionnez une désignation Papeterie.");
                const quantity = parseFloat(saleQuantityInput.value) || 0; if (quantity <= 0) throw new Error("Quantité > 0 requise.");
                const unitPrice = parseFloat(saleUnitPriceInput.value) || 0; if (unitPrice < 0) throw new Error("Prix unitaire >= 0 requis.");
                const totalAmount = parseFloat(saleTotalAmountInput.value) || (quantity * unitPrice);

                // Check stock *before* adding sale
                const currentStockItem = stockData.find(item => item.designation === designation && item.type === 'Papeterie');
                const availableStock = currentStockItem ? currentStockItem.remainingQuantity : 0;
                if (quantity > availableStock) {
                    if (!confirm(`Stock insuffisant pour ${designation} (Papeterie). Disponible: ${availableStock}. Vendre quand même (stock deviendra négatif) ?`)) {
                         throw new Error(`Vente annulée. Stock insuffisant.`);
                    }
                     console.warn(`Vente de ${quantity} ${designation} (Papeterie) effectuée malgré stock (${availableStock}) insuffisant.`);
                 }

                salesData.push({ date, type: 'Papeterie', designation, quantity, unitPrice, totalAmount });
                updateSalesTable(); dataUpdated = true; needsStockUpdate = true;

            } else if (operationType === 'Matériels électrique') {
                const designation = meDesignationSelect.value; if (!designation) throw new Error("Sélectionnez une désignation Mat. Électrique.");
                const quantity = parseFloat(meQuantityInput.value) || 0; if (quantity <= 0) throw new Error("Quantité > 0 requise.");
                const unitPrice = parseFloat(meUnitPriceInput.value) || 0; if (unitPrice < 0) throw new Error("Prix unitaire >= 0 requis.");
                const totalAmount = parseFloat(meTotalAmountInput.value) || (quantity * unitPrice);

                 // Check stock *before* adding sale
                 const currentStockItem = stockData.find(item => item.designation === designation && item.type === 'Matériels électrique');
                 const availableStock = currentStockItem ? currentStockItem.remainingQuantity : 0;
                  if (quantity > availableStock) {
                     if (!confirm(`Stock insuffisant pour ${designation} (Mat. Élec.). Disponible: ${availableStock}. Vendre quand même (stock deviendra négatif) ?`)) {
                          throw new Error(`Vente annulée. Stock insuffisant.`);
                     }
                      console.warn(`Vente de ${quantity} ${designation} (Mat. Élec.) effectuée malgré stock (${availableStock}) insuffisant.`);
                  }

                materielElectriqueData.push({ date, type: 'Matériels électrique', designation, quantity, unitPrice, totalAmount });
                updateMaterielElectriqueTable(); dataUpdated = true; needsStockUpdate = true;

            } else if (operationType === 'Dépenses') {
                const reason = expenseReasonInput.value.trim(); if (!reason) throw new Error("Motif dépense requis.");
                const amount = parseFloat(expenseAmountInput.value) || 0; if (amount <= 0) throw new Error("Montant dépense > 0 requis.");
                expensesData.push({ date, reason, amount });
                updateExpensesTable(); dataUpdated = true;

            } else if (operationType === 'Divers') {
                const designation = otherDesignationInput.value.trim(); if (!designation) throw new Error("Désignation/Motif requis pour Divers.");
                const quantity = parseFloat(otherQuantityInput.value); // Can be NaN
                const unitPriceOrAmount = parseFloat(otherUnitPriceInput.value) || 0; if (unitPriceOrAmount <= 0) throw new Error("Montant/Prix > 0 requis.");
                const totalAmount = parseFloat(otherTotalAmountInput.value) || unitPriceOrAmount; // Get calculated

                // Determine final quantity/price based on input logic for storage
                let finalQuantity, finalUnitPrice;
                 if (isNaN(quantity) || quantity === 0 || quantity === 1) {
                    finalQuantity = 1; // Store as 1 unit if direct amount was intended
                    finalUnitPrice = totalAmount; // Store the total amount as the 'unit price' in this case
                 } else {
                    finalQuantity = quantity;
                    finalUnitPrice = unitPriceOrAmount; // Use the entered unit price
                 }

                othersData.push({ date, type: 'Divers', designation, quantity: finalQuantity, unitPrice: finalUnitPrice, totalAmount });
                updateOthersTable(); dataUpdated = true;
            } else { throw new Error("Type d'opération inconnu."); }

            if (dataUpdated) {
                // Save all potentially modified sales data arrays
                localStorage.setItem('salesData', JSON.stringify(salesData));
                localStorage.setItem('materielElectriqueData', JSON.stringify(materielElectriqueData));
                localStorage.setItem('expensesData', JSON.stringify(expensesData));
                localStorage.setItem('othersData', JSON.stringify(othersData));

                salesForm.reset(); setTodaysDate(); // Reset form and date
                handleOperationTypeChange(); // Ensure correct sub-form is visible

                if (needsStockUpdate) {
                     updateStockTable(); // Update stock *after* saving sales data
                }
            }
        } catch (error) { alert(`Erreur ajout opération: ${error.message}`); }
    });

    if(employeeForm) employeeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = employeeEditIndexInput ? parseInt(employeeEditIndexInput.value, 10) : -1;

        if (!employeeNomInput) { alert("Erreur interne: Champ nom employé manquant."); return; }
        const nom = employeeNomInput.value.trim(); if (!nom) { alert("Nom employé requis."); return; }
        const salaryValue = employeeSalaryInput ? parseFloat(employeeSalaryInput.value) : null;
        const paidAmountValue = employeePaidAmountInput ? parseFloat(employeePaidAmountInput.value) : 0; // Default to 0 if empty/invalid

        // Validate numeric inputs
        if (salaryValue !== null && (isNaN(salaryValue) || salaryValue < 0)) { alert("Le salaire doit être un nombre positif ou vide."); return; }
        if (isNaN(paidAmountValue) || paidAmountValue < 0) { alert("Le montant payé doit être un nombre positif ou zéro."); return; }


        const employeeData = {
            nom,
            prenom: employeePrenomInput?.value.trim() || '',
            statut: employeeRoleInput?.value.trim() || '',
            adresse: employeeAdresseInput?.value.trim() || '',
            telephone: employeeTelephoneInput?.value.trim() || '',
            lieuResidence: employeeLieuResidenceInput?.value.trim() || '',
            joursTravail: employeeJoursTravailInput?.value.trim() || '',
            heureArrivee: employeeHeureArriveeInput?.value || '',
            heureDepart: employeeHeureDepartInput?.value || '',
            salary: salaryValue, // Store null if not provided
            paidAmount: paidAmountValue,
            hireDate: employeeHireDateInput?.value || '',
            contactPersonNom: employeeContactPersonNomInput?.value.trim() || '',
            contactPersonPrenom: employeeContactPersonPrenomInput?.value.trim() || '',
            contactPersonAdresse: employeeContactPersonAdresseInput?.value.trim() || '',
            contactPersonTelephone: employeeContactPersonTelephoneInput?.value.trim() || '',
            contactPersonLieuResidence: employeeContactPersonLieuResidenceInput?.value.trim() || ''
        };

        if (editIndex > -1 && editIndex < employeesData.length) {
            employeesData[editIndex] = employeeData;
            alert('Employé mis à jour.');
        } else {
            employeesData.push(employeeData);
            alert('Employé ajouté.');
        }

        localStorage.setItem('employeesData', JSON.stringify(employeesData));
        updateEmployeesTable();
        employeeForm.reset();
        setTodaysDate();
        if(employeeEditIndexInput) employeeEditIndexInput.value = ''; // Clear edit index
        employeeForm.querySelector('button[type="submit"]').textContent = 'Ajouter Employé';
    });

     if(learnerForm) learnerForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = learnerEditIndexInput ? parseInt(learnerEditIndexInput.value, 10) : -1;

        if (!learnerNomInput || !learnerFiliereInput) { alert("Erreur interne: Champs apprenant manquants."); return; }
        const nom = learnerNomInput.value.trim(); const filiere = learnerFiliereInput.value.trim();
        if (!nom || !filiere) { alert("Nom et filière requis."); return; }
        const ageValue = learnerAgeInput ? parseInt(learnerAgeInput.value) : null;
        const fraisDocsValue = learnerFraisDocumentsInput ? parseFloat(learnerFraisDocumentsInput.value) : 0;
        const tranche1Value = learnerTranche1Input ? parseFloat(learnerTranche1Input.value) : 0;
        const tranche2Value = learnerTranche2Input ? parseFloat(learnerTranche2Input.value) : 0;
        const tranche3Value = learnerTranche3Input ? parseFloat(learnerTranche3Input.value) : 0;
        const tranche4Value = learnerTranche4Input ? parseFloat(learnerTranche4Input.value) : 0;

         // Validation
         if (ageValue !== null && (isNaN(ageValue) || ageValue < 0)) { alert("L'âge doit être un nombre positif."); return; }
         if (isNaN(fraisDocsValue) || fraisDocsValue < 0 ||
             isNaN(tranche1Value) || tranche1Value < 0 ||
             isNaN(tranche2Value) || tranche2Value < 0 ||
             isNaN(tranche3Value) || tranche3Value < 0 ||
             isNaN(tranche4Value) || tranche4Value < 0) {
             alert("Les frais et tranches doivent être des nombres positifs ou zéro."); return;
         }

        const learnerData = {
            nom, prenom: learnerPrenomInput?.value.trim() || '',
            age: ageValue, // Store null if not entered
            adresse: learnerAdresseInput?.value.trim() || '',
            lieuResidence: learnerLieuResidenceInput?.value.trim() || '',
            niveauEtudes: learnerNiveauEtudesInput?.value.trim() || '',
            situationMatrimoniale: learnerSituationMatrimonialeSelect?.value || '',
            pereNom: learnerPereNomInput?.value.trim() || '', perePrenom: learnerPerePrenomInput?.value.trim() || '',
            mereNom: learnerMereNomInput?.value.trim() || '', merePrenom: learnerMerePrenomInput?.value.trim() || '',
            filiere, dureeFormation: learnerDureeFormationInput?.value.trim() || '',
            fraisDocuments: fraisDocsValue,
            tranche1: tranche1Value,
            tranche2: tranche2Value,
            tranche3: tranche3Value,
            tranche4: tranche4Value,
            garantNom: learnerGarantNomInput?.value.trim() || '', garantPrenom: learnerGarantPrenomInput?.value.trim() || '',
            garantTelephone: learnerGarantTelephoneInput?.value.trim() || '',
            garantAdresse: learnerGarantAdresseInput?.value.trim() || ''
        };

         if (editIndex > -1 && editIndex < learnersData.length) {
             learnersData[editIndex] = learnerData;
             alert('Apprenant mis à jour.');
         } else {
             learnersData.push(learnerData);
             alert('Apprenant ajouté.');
         }

        localStorage.setItem('learnersData', JSON.stringify(learnersData));
        updateLearnersTable();
        learnerForm.reset();
         if(learnerEditIndexInput) learnerEditIndexInput.value = '';
        learnerForm.querySelector('button[type="submit"]').textContent = 'Ajouter Apprenant';
    });

     if(mobileMoneyForm) mobileMoneyForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = mobileMoneyEditIndexInput ? parseInt(mobileMoneyEditIndexInput.value, 10) : -1;

        if (!mmDateInput || !mmAgentInput) { alert("Erreur interne: Champs Point MM manquants."); return; }
        const date = mmDateInput.value; const agent = mmAgentInput.value.trim();
        if (!date || !agent) { alert("Date et Agent requis pour Point MM."); return; }
        const balanceMoov = parseFloat(mmBalanceMoovInput?.value) || 0; const balanceMTN = parseFloat(mmBalanceMtnInput?.value) || 0; const balanceCelttis = parseFloat(mmBalanceCelttisInput?.value) || 0; const balanceCash = parseFloat(mmBalanceCashInput?.value) || 0; const creditMoov = parseFloat(mmCreditMoovInput?.value) || 0; const creditMTN = parseFloat(mmCreditMtnInput?.value) || 0; const creditCelttis = parseFloat(mmCreditCelttisInput?.value) || 0;
        const perteTransfert = parseFloat(mmPerteTransfertInput?.value) || 0;
        const perteCredit = parseFloat(mmPerteCreditInput?.value) || 0;
        if (balanceMoov < 0 || balanceMTN < 0 || balanceCelttis < 0 || balanceCash < 0 || creditMoov < 0 || creditMTN < 0 || creditCelttis < 0 || perteTransfert < 0 || perteCredit < 0) { alert("Les soldes, crédits et pertes MM ne peuvent pas être négatifs."); return; }

        const transactionData = { date, agent, balanceMoov, balanceMTN, balanceCelttis, balanceCash, creditMoov, creditMTN, creditCelttis, perteTransfert, perteCredit };

        if (editIndex > -1 && editIndex < mobileMoneyData.length) {
             // Check uniqueness for date+agent if editing, excluding self
             const existingEntryIndex = mobileMoneyData.findIndex((item, idx) =>
                 item.date === date && item.agent === agent && idx !== editIndex
             );
             if (existingEntryIndex > -1) {
                 alert(`Un autre point existe déjà pour l'agent ${agent} à la date ${date}.`);
                 return;
             }
            mobileMoneyData[editIndex] = transactionData;
            alert('Point Mobile Money mis à jour.');
        } else {
            // Check uniqueness for date+agent when adding
            const existingEntryIndex = mobileMoneyData.findIndex(item => item.date === date && item.agent === agent);
            if (existingEntryIndex > -1) {
                alert(`Un point existe déjà pour l'agent ${agent} à la date ${date}. Modifiez l'entrée existante.`);
                return;
            }
            mobileMoneyData.push(transactionData);
            alert('Point Mobile Money ajouté.');
        }

        localStorage.setItem('mobileMoneyData', JSON.stringify(mobileMoneyData));
        updateMobileMoneyTable();
        mobileMoneyForm.reset(); setTodaysDate();
         if(mobileMoneyEditIndexInput) mobileMoneyEditIndexInput.value = '';
        mobileMoneyForm.querySelector('button[type="submit"]').textContent = 'Ajouter Point Journalier';
    });

    if(mmFournisseurForm) mmFournisseurForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editKey = mmFournisseurEditKeyInput?.value || ''; // "Nom_Prenom"

        const nom = mmFournisseurNomInput?.value.trim();
        const prenom = mmFournisseurPrenomInput?.value.trim();
        const contact = mmFournisseurContactInput?.value.trim();
        const montantFourni = parseFloat(mmFournisseurMontantInput?.value);
        const interet = parseFloat(mmFournisseurInteretInput?.value);
        const creditVendu = parseFloat(mmFournisseurVenduInput?.value) || 0;

        if (!nom) { alert("Le nom du fournisseur MM est requis."); return; }
        if (isNaN(montantFourni) || montantFourni < 0) { alert("Le Montant Fourni doit être un nombre positif."); return; }
        if (creditVendu < 0) { alert("Le Crédit Vendu ne peut être négatif."); return; }
        if (!isNaN(interet) && interet < 0) { alert("L'intérêt ne peut être négatif."); return; }
        // Allow credit vendu > montant fourni temporarily, but maybe warn? Table highlights it.
        // if (creditVendu > montantFourni) { alert("Le Crédit Vendu ne peut pas dépasser le Montant Fourni."); return; }

        const fournisseurData = {
             nom, prenom, contact, montantFourni,
             interet: !isNaN(interet) ? interet : null, // Store null if invalid/empty
             creditVendu
         };

        let existingIndex = -1;
        let isNameChangeDuringEdit = false;

        if(editKey) {
            const [editNom, editPrenom] = editKey.split('_'); // Use original key parts
            existingIndex = mmFournisseursData.findIndex(f => f.nom === editNom && f.prenom === editPrenom);
             if (existingIndex > -1 && (nom !== editNom || prenom !== editPrenom)) {
                 isNameChangeDuringEdit = true;
             }
        } else {
            // If not editing, check if adding a duplicate (using new name/prenom)
            existingIndex = mmFournisseursData.findIndex(f => f.nom === nom && f.prenom === prenom);
             if (existingIndex > -1) {
                 alert(`Fournisseur ${nom} ${prenom} existe déjà. Modifiez-le via le bouton d'édition du tableau.`);
                 return; // Prevent adding duplicate
             }
        }

        if (isNameChangeDuringEdit) {
            // Treat as adding a new one if primary key (name/prenom) changed during edit
            const duplicateCheck = mmFournisseursData.findIndex(f => f.nom === nom && f.prenom === prenom);
            if (duplicateCheck > -1) {
                 alert(`Impossible de renommer : un autre fournisseur existe déjà avec le nom ${nom} ${prenom}.`);
                 // Optional: revert form fields to original names from editKey
                 const [origN, origP] = editKey.split('_');
                 mmFournisseurNomInput.value = origN;
                 mmFournisseurPrenomInput.value = origP;
                 return;
            }
            // Remove the old entry identified by editKey
            const [editN, editP] = editKey.split('_');
            mmFournisseursData = mmFournisseursData.filter(f => !(f.nom === editN && f.prenom === editP));
            // Add the new entry
            mmFournisseursData.push(fournisseurData);
             alert(`Fournisseur renommé/ajouté : ${nom} ${prenom} (l'ancienne entrée a été supprimée).`);

        } else if (existingIndex > -1) {
            // Normal update (key didn't change or wasn't editing)
            mmFournisseursData[existingIndex] = fournisseurData;
             alert(`Fournisseur ${nom} ${prenom} mis à jour.`);
        } else {
            // Add new (no existing found with new name, and wasn't an edit)
            mmFournisseursData.push(fournisseurData);
            alert(`Fournisseur ${nom} ${prenom} ajouté.`);
        }

        localStorage.setItem('mmFournisseursData', JSON.stringify(mmFournisseursData));
        updateMmFournisseursTable();
        mmFournisseurForm.reset();
        if(mmFournisseurEditKeyInput) mmFournisseurEditKeyInput.value = ''; // Clear edit key
        mmFournisseurForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Fournisseur';
    });

    if(clientProfileForm) clientProfileForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editKey = clientProfileEditKeyInput?.value || ''; // "Nom_Prenom"

        const nom = clientProfileNomInput?.value.trim();
        const prenom = clientProfilePrenomInput?.value.trim();
        const adresse = clientProfileAdresseInput?.value.trim();
        const contact = clientProfileContactInput?.value.trim();
        const statut = clientProfileStatutInput?.value.trim();

        if (!nom) { alert("Le nom du client est requis pour le profil."); return; }

        const profileData = { nom, prenom, adresse, contact, statut };

         let existingIndex = -1;
         let isNameChangeDuringEdit = false;

         if(editKey) {
             const [editNom, editPrenom] = editKey.split('_');
             existingIndex = clientProfilesData.findIndex(p => p.nom === editNom && p.prenom === editPrenom);
              if (existingIndex > -1 && (nom !== editNom || prenom !== editPrenom)) {
                  isNameChangeDuringEdit = true;
              }
         } else {
             // Check duplicate on add using the new name/prenom
             existingIndex = clientProfilesData.findIndex(p => p.nom === nom && p.prenom === prenom);
             if (existingIndex > -1) {
                  alert(`Profil pour ${nom} ${prenom} existe déjà. Modifiez-le via le bouton d'édition du tableau.`);
                  return; // Prevent adding duplicate
              }
         }

         if (isNameChangeDuringEdit) {
             // Check if the *new* name already exists elsewhere
             const duplicateCheck = clientProfilesData.findIndex(p => p.nom === nom && p.prenom === prenom);
             if (duplicateCheck > -1) {
                  alert(`Impossible de renommer : un autre profil existe déjà avec le nom ${nom} ${prenom}.`);
                  const [origN, origP] = editKey.split('_');
                  clientProfileNomInput.value = origN;
                  clientProfilePrenomInput.value = origP;
                  return;
             }

             // Find the original profile to update associated creditors
             const [origN, origP] = editKey.split('_');
             const originalFullName = `${origN} ${origP}`.trim();
             const newFullName = `${nom} ${prenom}`.trim();

             // Update creditor records associated with the *old* name
             let creditorsUpdated = false;
             creditorsData.forEach(cred => {
                 if (cred.name === originalFullName) {
                     cred.name = newFullName; // Update the name in the creditor record
                     creditorsUpdated = true;
                 }
             });

             // Remove the old profile
             clientProfilesData = clientProfilesData.filter(p => !(p.nom === origN && p.prenom === origP));
             // Add the new profile data
             clientProfilesData.push(profileData);
              alert(`Profil client renommé en ${nom} ${prenom}. Les transactions de crédit associées ont été mises à jour.`);

             if (creditorsUpdated) {
                 localStorage.setItem('creditorsData', JSON.stringify(creditorsData));
                 updateCreditorsTable(); // Refresh creditor table if names changed
             }

         } else if (existingIndex > -1) {
             // Normal update
             clientProfilesData[existingIndex] = profileData;
             alert(`Profil client ${nom} ${prenom} mis à jour.`);
             // No need to update creditors here as name didn't change
         } else {
             // Add new
             clientProfilesData.push(profileData);
             alert(`Profil client ${nom} ${prenom} ajouté.`);
         }

         localStorage.setItem('clientProfilesData', JSON.stringify(clientProfilesData));
         updateClientProfilesTable();
         populateClientSelect(); // Update dropdown in creditor section
         clientProfileForm.reset();
         if(clientProfileEditKeyInput) clientProfileEditKeyInput.value = ''; // Clear edit key
         clientProfileForm.querySelector('button[type="submit"]').textContent = 'Ajouter / Mettre à Jour Profil';
    });

     if(creditorForm) creditorForm.addEventListener('submit', function (event) {
        event.preventDefault();
        // Edit of *existing* credits is handled by recording payments, not direct edit form

        if (!creditorDateInput || !creditorNameSelect || !creditorDesignationInput || !creditorAmountPaidInput) { alert("Erreur interne: Champs Transaction Crédit manquants."); return; }

        const date = creditorDateInput.value;
        const name = creditorNameSelect.value; // Full name from select
        const designation = creditorDesignationInput.value.trim();
        // Allow null quantity/unit price if total amount is entered directly
        const quantity = creditorQuantityInput?.value ? (parseFloat(creditorQuantityInput.value) || null) : null;
        const unitPrice = creditorUnitPriceInput?.value ? (parseFloat(creditorUnitPriceInput.value) || null) : null;
        // Read total amount directly from its field
        const totalAmountDueEntered = parseFloat(creditorTotalAmountDueInput.value);
        const amountPaidNow = parseFloat(creditorAmountPaidInput.value);
        const dueDate = creditorDueDateInput?.value || '';

        if (!date || !name || !designation) { alert("Date, Client et Désignation sont requis."); return; }
        if (isNaN(amountPaidNow) || amountPaidNow < 0) { alert("Le Montant Payé ce jour doit être positif ou zéro."); return; }

        // Find an *existing, non-settled* credit transaction matching client and designation
        // This assumes one designation per client is tracked as a single running credit line.
        // If multiple credits for the same designation are needed, a more complex key/ID system is required.
        const existingCreditorIndex = creditorsData.findIndex(c =>
            c.name === name &&
            c.designation === designation &&
            ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) > 0.005) // Check if remaining > 0 (not settled)
        );

        try {
            if (existingCreditorIndex > -1) {
                // --- UPDATE EXISTING (Record Payment) ---
                // User is trying to add a payment to an existing credit line for this designation
                const existingCreditor = creditorsData[existingCreditorIndex];
                const currentRemaining = (existingCreditor.totalAmountDue || 0) - (existingCreditor.amountPaidTotal || 0);

                 // If user entered a new Total Due, Quantity, or Unit Price while an existing credit is selected, it's confusing.
                 // We prioritize adding the payment to the existing credit. Ignore the Qty/PU/Total fields in this case.
                 if (!isNaN(totalAmountDueEntered) && totalAmountDueEntered > 0 && totalAmountDueEntered !== existingCreditor.totalAmountDue) {
                     console.warn(`Tentative d'ajout de paiement pour ${name}-${designation}, mais un Montant Total Dû a aussi été entré. Le Montant Total Dû est ignoré, seul le paiement est appliqué au crédit existant.`);
                 }

                if (amountPaidNow > currentRemaining + 0.005) { // Allow small tolerance
                     throw new Error(`Le paiement (${formatAmount(amountPaidNow)}) dépasse le solde restant (${formatAmount(currentRemaining)}) pour ${name} - ${designation}.`);
                 }

                existingCreditor.amountPaidTotal = (existingCreditor.amountPaidTotal || 0) + amountPaidNow;
                existingCreditor.lastPaymentDate = date; // Update last payment date
                if (dueDate && dueDate !== existingCreditor.dueDate) existingCreditor.dueDate = dueDate; // Update due date if provided

                 alert(`Paiement de ${formatAmount(amountPaidNow)} enregistré pour ${name} - ${designation}.\nNouveau solde restant : ${formatAmount(existingCreditor.totalAmountDue - existingCreditor.amountPaidTotal)}`);

            } else {
                // --- ADD NEW CREDIT TRANSACTION ---
                // No existing *unsettled* credit found for this client/designation. Create a new one.
                 if (isNaN(totalAmountDueEntered) || totalAmountDueEntered <= 0) {
                     // Calculate total from Qty * PU if available and Total field is empty/invalid
                     if (quantity !== null && unitPrice !== null && quantity > 0 && unitPrice >= 0) {
                         creditorTotalAmountDueInput.value = formatAmount(quantity * unitPrice);
                         // Re-read the calculated value
                         const calculatedTotal = parseFloat(creditorTotalAmountDueInput.value);
                          if (isNaN(calculatedTotal) || calculatedTotal <= 0) {
                               throw new Error("Le Montant Total Dû est requis et doit être > 0 pour une nouvelle transaction (ou calculable depuis Qté*PU).");
                           }
                           // If we just calculated it, use it directly
                            const finalTotalDue = calculatedTotal;
                            if (amountPaidNow > finalTotalDue + 0.005) throw new Error(`Montant Payé (${formatAmount(amountPaidNow)}) ne peut dépasser Total Dû (${formatAmount(finalTotalDue)}) pour une nouvelle transaction.`);
                            addNewCreditTransaction(date, name, designation, quantity, unitPrice, finalTotalDue, amountPaidNow, dueDate);

                     } else {
                        throw new Error("Le Montant Total Dû est requis et doit être > 0 pour une nouvelle transaction (ou calculable depuis Qté*PU).");
                     }
                 } else {
                    // Total Amount was entered directly, use it
                     const finalTotalDue = totalAmountDueEntered;
                    // Validate Qty * PU against entered total if both are present
                     if (quantity !== null && unitPrice !== null && quantity > 0 && unitPrice >= 0) {
                         const calculatedTotal = quantity * unitPrice;
                         if (Math.abs(calculatedTotal - finalTotalDue) > 0.01) {
                             if (!confirm(`Le Montant Total Dû entré (${formatAmount(finalTotalDue)}) est différent du calcul Qté*PU (${formatAmount(calculatedTotal)}). Voulez-vous continuer avec le montant ${formatAmount(finalTotalDue)} ?`)) return; // Cancel if user disagrees
                         }
                     }
                     if (amountPaidNow > finalTotalDue + 0.005) throw new Error(`Montant Payé (${formatAmount(amountPaidNow)}) ne peut dépasser Total Dû (${formatAmount(finalTotalDue)}) pour une nouvelle transaction.`);
                     addNewCreditTransaction(date, name, designation, quantity, unitPrice, finalTotalDue, amountPaidNow, dueDate);
                 }
            }

            // Save and update UI outside the if/else blocks
            localStorage.setItem('creditorsData', JSON.stringify(creditorsData));
            updateCreditorsTable();
            creditorForm.reset();
            populateClientSelect(); // Refresh select options and trigger contact update
            setTodaysDate(); // Reset dates

        } catch (error) { alert(`Erreur Gestion Crédit Client : ${error.message}`); }
    });

    // Helper function to add a new credit transaction
    function addNewCreditTransaction(date, name, designation, quantity, unitPrice, totalAmountDue, amountPaidNow, dueDate) {
         // Check if an identical *settled* credit exists to warn user about potential duplicate entry
         const soldCreditorExists = creditorsData.some(c =>
             c.name === name &&
             c.designation === designation &&
             ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) <= 0.005) // Check if settled
         );
         if (soldCreditorExists) {
             if (!confirm(`Un crédit similaire déjà soldé existe pour ${name} - ${designation}. Créer quand même une NOUVELLE transaction ? (Ceci créera une nouvelle ligne de crédit)`)) return;
         }

        const newCreditor = {
            date: date, // Date of initial transaction
            name: name,
            designation: designation,
            quantity: quantity, // May be null
            unitPrice: unitPrice, // May be null
            totalAmountDue: totalAmountDue,
            amountPaidTotal: amountPaidNow,
            lastPaymentDate: date, // Initially same as transaction date if paid > 0
            dueDate: dueDate || null,
            // Contact is not stored here; fetched dynamically from profiles
        };
        creditorsData.push(newCreditor);
        alert(`Nouveau crédit créé pour ${name} - ${designation}.\nDû: ${formatAmount(totalAmountDue)}, Payé: ${formatAmount(amountPaidNow)}, Restant: ${formatAmount(totalAmountDue - amountPaidNow)}`);
    }


     if(debtForm) debtForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const editIndex = debtEditIndexInput ? parseInt(debtEditIndexInput.value, 10) : -1;

        if (!debtDateInput || !debtTypeSelect || !debtNameInput || !debtDescriptionInput || !debtAmountInput || !debtStatusSelect) { alert("Erreur interne: Champs Dette/Prêt manquants."); return; }
        const date = debtDateInput.value;
        const type = debtTypeSelect.value;
        const name = debtNameInput.value.trim();
        const description = debtDescriptionInput.value.trim();
        const amount = parseFloat(debtAmountInput.value);
        const dueDate = debtDueDateInput?.value || ''; // Allow empty due date
        const status = debtStatusSelect.value;
        if (!date || !type || !name || !description || isNaN(amount) || amount <= 0 || !status) { alert("Veuillez remplir correctement tous les champs Dette/Prêt (Date, Type, Nom, Description, Montant > 0, Statut)."); return; }

        const debtItemData = { date, type, name, description, amount, dueDate, status };

         if (editIndex > -1 && editIndex < debtData.length) {
             debtData[editIndex] = debtItemData;
             alert('Dette/Prêt mis à jour.');
         } else {
             // Prevent adding exact duplicate (optional check)
             const isDuplicate = debtData.some(d => d.date === date && d.type === type && d.name === name && d.description === description && d.amount === amount);
             if (isDuplicate) {
                 if (!confirm("Une entrée très similaire existe déjà. Ajouter quand même ?")) return;
             }
             debtData.push(debtItemData);
             alert('Dette/Prêt ajouté.');
         }

        localStorage.setItem('debtData', JSON.stringify(debtData));
        updateDebtTable();
        debtForm.reset(); setTodaysDate();
        if(debtEditIndexInput) debtEditIndexInput.value = '';
        debtForm.querySelector('button[type="submit"]').textContent = 'Ajouter Dette/Prêt';
    });


    // --- Gestionnaires d'événements pour afficher/masquer les détails ---
    const addToggleListener = (button, container) => { if(button && container) button.addEventListener('click', () => toggleVisibility(container)); };
    addToggleListener(showSupplyListButton, supplyListContainer);
    addToggleListener(showStockDetailsButton, stockDetailsContainer);
    addToggleListener(showEmployeesDetailsButton, employeesDetailsContainer);
    addToggleListener(showLearnersDetailsButton, learnersDetailsContainer);
    addToggleListener(showMobileMoneyDetailsButton, mobileMoneyDetailsContainer);
    addToggleListener(showMmFournisseursDetailsButton, mmFournisseursDetailsContainer);
    addToggleListener(showClientProfilesButton, clientProfilesContainer);
    addToggleListener(showCreditorsDetailsButton, creditorsDetailsContainer);
    addToggleListener(showDebtDetailsButton, debtDetailsContainer);
    addToggleListener(showReportDetailsButton, reportDetailsContainer);
    // Special toggles for sales subsections
    if(showSalesDetailsButton) showSalesDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(salesDetailsContainer));
    if(showMaterielElectriqueDetailsButton) showMaterielElectriqueDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(materielElectriqueDetailsContainer));
    if(showExpensesDetailsButton) showExpensesDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(expensesDetailsContainer));
    if(showOthersDetailsButton) showOthersDetailsButton.addEventListener('click', () => toggleSalesSubSectionVisibility(othersDetailsContainer));

    // --- Gestionnaires d'événements pour la visibilité des sections principales ---
    const allSections = [supplySection, salesSection, employeesSection, learnersSection, mobileMoneySection, creditorsSection, debtSection, reportSection].filter(Boolean);
    const addSectionToggleListener = (button, sectionToShow) => {
        if (button) button.addEventListener('click', () => setSectionVisibility(sectionToShow, allSections.filter(s => s !== sectionToShow)));
    };
    addSectionToggleListener(showSupplySectionButton, supplySection);
    addSectionToggleListener(showSalesSectionButton, salesSection);
    addSectionToggleListener(showEmployeesSectionButton, employeesSection);
    addSectionToggleListener(showLearnersSectionButton, learnersSection);
    addSectionToggleListener(showMobileMoneySectionButton, mobileMoneySection);
    addSectionToggleListener(showCreditorsSectionButton, creditorsSection);
    addSectionToggleListener(showDebtSectionButton, debtSection);
    if(showReportSectionButton) showReportSectionButton.addEventListener('click', () => {
        setSectionVisibility(reportSection, allSections.filter(s => s !== reportSection));
        if (reportFilters) reportFilters.style.display = 'none'; // Hide filters initially
        if (reportDetailsContainer) reportDetailsContainer.style.display = 'none';
        if (showReportDetailsButton) showReportDetailsButton.style.display = 'none';
    });

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

    // Update contact field when client selection changes in creditor form
    if(creditorNameSelect) creditorNameSelect.addEventListener('change', function() {
         const selectedOption = this.options[this.selectedIndex];
         const contact = selectedOption?.dataset?.contact || ''; // Get contact from data attribute
         if (creditorContactInput) {
             creditorContactInput.value = contact;
         }
         // Clear designation/amount fields when changing client? Optional.
         // if(creditorDesignationInput) creditorDesignationInput.value = '';
         // if(creditorQuantityInput) creditorQuantityInput.value = '';
         // if(creditorUnitPriceInput) creditorUnitPriceInput.value = '';
         // if(creditorTotalAmountDueInput) creditorTotalAmountDueInput.value = '';
         // if(creditorAmountPaidInput) creditorAmountPaidInput.value = '';
    });

    // --- Gestionnaires d'événements pour Impression (Tables) ---
    const addPrintListener = (button, containerId) => { if (button) button.addEventListener('click', () => printSpecificTable(containerId)); };
    addPrintListener(printSupplyButton, 'supply-list-container');
    addPrintListener(printStockButton, 'stock-details-container');
    addPrintListener(printSalesButton, 'sales-details-container');
    addPrintListener(printMaterielElectriqueButton, 'materiel-electrique-details-container');
    addPrintListener(printExpensesButton, 'expenses-details-container');
    addPrintListener(printOthersButton, 'others-details-container');
    addPrintListener(printEmployeesButton, 'employees-details-container');
    addPrintListener(printLearnersButton, 'learners-details-container');
    addPrintListener(printMobileMoneyButton, 'mobile-money-details-container');
    addPrintListener(printMmFournisseursButton, 'mm-fournisseurs-details-container');
    addPrintListener(printClientProfilesButton, 'client-profiles-container');
    addPrintListener(printCreditorsButton, 'creditors-details-container');
    addPrintListener(printDebtButton, 'debt-details-container');
    addPrintListener(printReportButton, 'report-details-container');

    // --- Gestionnaires d'événements pour Export Excel ---
    const addExcelListener = (button, tableId, fileName) => { if (button) button.addEventListener('click', () => exportToExcel(tableId, fileName)); };
    addExcelListener(exportSupplyExcelButton, 'supply-table', 'Approvisionnements.xlsx');
    addExcelListener(exportStockExcelButton, 'stock-table', 'Etat_Stocks.xlsx');
    addExcelListener(exportSalesExcelButton, 'sales-table', 'Ventes_Papeterie.xlsx');
    addExcelListener(exportMaterielElectriqueExcelButton, 'materiel-electrique-table', 'Ventes_Mat_Electrique.xlsx');
    addExcelListener(exportExpensesExcelButton, 'expenses-table', 'Depenses.xlsx');
    addExcelListener(exportOthersExcelButton, 'others-table', 'Operations_Diverses.xlsx');
    addExcelListener(exportEmployeesExcelButton, 'employees-table', 'Employes.xlsx');
    addExcelListener(exportLearnersExcelButton, 'learners-table', 'Apprenants.xlsx');
    addExcelListener(exportMobileMoneyExcelButton, 'mobile-money-table', 'Mobile_Money_Points.xlsx');
    addExcelListener(exportMmFournisseursExcelButton, 'mm-fournisseurs-table', 'Mobile_Money_Fournisseurs.xlsx');
    addExcelListener(exportClientProfilesExcelButton, 'client-profiles-table', 'Profils_Clients.xlsx');
    addExcelListener(exportCreditorsExcelButton, 'creditors-table', 'Credits_Clients_Transactions.xlsx');
    addExcelListener(exportDebtExcelButton, 'debt-table', 'Dettes_Prets_Entreprise.xlsx');
    addExcelListener(exportReportExcelButton, 'report-table', 'Bilan_Genere.xlsx');

    // --- Gestionnaires d'événements pour Export PDF ---
    const addPdfListener = (button, tableId, fileName) => { if (button) button.addEventListener('click', () => exportToPdf(tableId, fileName)); };
    addPdfListener(exportSupplyPdfButton, 'supply-table', 'Approvisionnements.pdf');
    addPdfListener(exportStockPdfButton, 'stock-table', 'Etat_Stocks.pdf');
    addPdfListener(exportSalesPdfButton, 'sales-table', 'Ventes_Papeterie.pdf');
    addPdfListener(exportMaterielElectriquePdfButton, 'materiel-electrique-table', 'Ventes_Mat_Electrique.pdf');
    addPdfListener(exportExpensesPdfButton, 'expenses-table', 'Depenses.pdf');
    addPdfListener(exportOthersPdfButton, 'others-table', 'Operations_Diverses.pdf');
    addPdfListener(exportEmployeesPdfButton, 'employees-table', 'Employes.pdf');
    addPdfListener(exportLearnersPdfButton, 'learners-table', 'Apprenants.pdf');
    addPdfListener(exportMobileMoneyPdfButton, 'mobile-money-table', 'Mobile_Money_Points.pdf');
    addPdfListener(exportMmFournisseursPdfButton, 'mm-fournisseurs-table', 'Mobile_Money_Fournisseurs.pdf');
    addPdfListener(exportClientProfilesPdfButton, 'client-profiles-table', 'Profils_Clients.pdf');
    addPdfListener(exportCreditorsPdfButton, 'creditors-table', 'Credits_Clients_Transactions.pdf');
    addPdfListener(exportDebtPdfButton, 'debt-table', 'Dettes_Prets_Entreprise.pdf');
    addPdfListener(exportReportPdfButton, 'report-table', 'Bilan_Genere.pdf');

    // --- Gestionnaires d'événements pour les Rapports (Bilans) ---
     const showReportFilters = (showDaily, showWeekly, showMonthly, showYearly) => {
        if (reportFilters) reportFilters.style.display = 'block'; // Show filter section
        if (dailyFilter) dailyFilter.style.display = showDaily ? 'flex' : 'none';
        if (weeklyFilter) weeklyFilter.style.display = showWeekly ? 'flex' : 'none';
        if (monthlyFilter) monthlyFilter.style.display = showMonthly ? 'flex' : 'none';
        if (yearlyFilter) yearlyFilter.style.display = showYearly ? 'flex' : 'none';
        if (reportDetailsContainer) reportDetailsContainer.style.display = 'none'; // Hide results
        if (showReportDetailsButton) showReportDetailsButton.style.display = 'none'; // Hide toggle button
        setTodaysDate(); // Ensure default dates/periods are set when showing filters
     };
    if(dailyReportButton) dailyReportButton.addEventListener('click', () => showReportFilters(true, false, false, false));
    if(weeklyReportButton) weeklyReportButton.addEventListener('click', () => showReportFilters(false, true, false, false));
    if(monthlyReportButton) monthlyReportButton.addEventListener('click', () => showReportFilters(false, false, true, false));
    if(yearlyReportButton) yearlyReportButton.addEventListener('click', () => showReportFilters(false, false, false, true));

    if(generateReportButton) generateReportButton.addEventListener('click', function () {
        let selectedDate = null, selectedWeek = null, selectedMonth = null, selectedYear = null, filterType = '', filterLabel = '';

        if (dailyFilter?.style.display === 'flex') { selectedDate = reportDateInput?.value; filterType = 'day'; filterLabel = selectedDate ? `Jour: ${selectedDate}` : 'Journalier'; }
        else if (weeklyFilter?.style.display === 'flex') { selectedWeek = reportWeekInput?.value; filterType = 'week'; filterLabel = selectedWeek ? `Semaine: ${selectedWeek}` : 'Hebdomadaire'; }
        else if (monthlyFilter?.style.display === 'flex') { selectedMonth = reportMonthInput?.value; filterType = 'month'; filterLabel = selectedMonth ? `Mois: ${selectedMonth}` : 'Mensuel'; }
        else if (yearlyFilter?.style.display === 'flex') { selectedYear = reportYearInput?.value; filterType = 'year'; filterLabel = selectedYear ? `Année: ${selectedYear}` : 'Annuel'; }
        else { alert("Choisissez d'abord un type de bilan (Journalier, Hebdo, etc.)."); return; }

        if ((filterType === 'day' && !selectedDate) || (filterType === 'week' && !selectedWeek) || (filterType === 'month' && !selectedMonth) || (filterType === 'year' && !selectedYear)) { alert("Veuillez spécifier la période (jour, semaine, mois ou année)."); return; }

        // --- Filter Logic ---
        const filterDataByDate = (data) => {
            if (!Array.isArray(data)) return [];
            return data.filter(item => {
                if (!item?.date) return false; // Skip items without a date
                const itemDateStr = item.date; // Expect YYYY-MM-DD format

                try {
                    // Basic string comparisons are efficient for day, month, year
                    if (filterType === 'day') {
                        return itemDateStr === selectedDate;
                    }
                    if (filterType === 'month') {
                        return itemDateStr.substring(0, 7) === selectedMonth; // Compare "YYYY-MM"
                    }
                    if (filterType === 'year') {
                        return itemDateStr.substring(0, 4) === selectedYear.toString(); // Compare "YYYY"
                    }
                    if (filterType === 'week') {
                        if (!selectedWeek?.includes('-W')) return false; // Invalid week format
                        const [yW, wW] = selectedWeek.split('-W').map(Number);
                        if (isNaN(yW) || isNaN(wW)) return false; // Invalid week numbers

                        const itemDate = new Date(itemDateStr + 'T00:00:00Z'); // Use UTC to avoid TZ shifts
                        if (isNaN(itemDate.getTime())) return false; // Skip invalid dates in data

                        const startOfWeek = getDateOfISOWeek(wW, yW); // Get Monday UTC 00:00
                        if (isNaN(startOfWeek.getTime())) return false; // Could not calculate start of week

                        const endOfWeek = new Date(startOfWeek);
                        endOfWeek.setUTCDate(startOfWeek.getUTCDate() + 6); // Sunday UTC 23:59:59... effectively <= Sunday
                        // Make end date inclusive by setting time to end of day
                        endOfWeek.setUTCHours(23, 59, 59, 999);

                        // Check if the item's date falls within the calculated week range (inclusive)
                        return itemDate >= startOfWeek && itemDate <= endOfWeek;
                    }
                    return false; // Should not happen if filterType is set
                } catch (e) {
                    console.error("Erreur filtre date pour", item, "avec filtre", filterType, selectedDate || selectedWeek || selectedMonth || selectedYear, e);
                    return false; // Skip item on error
                }
            });
        };

        // Filter all relevant data sets
        const filteredSales = filterDataByDate(salesData);
        const filteredMESales = filterDataByDate(materielElectriqueData);
        const filteredExpenses = filterDataByDate(expensesData);
        const filteredOthers = filterDataByDate(othersData);
        const filteredSupplies = filterDataByDate(supplyData); // Supplies cost in the period
        const filteredMobileMoney = filterDataByDate(mobileMoneyData); // Daily MM points in the period
        // Note: Employee salaries paid, learner payments, creditor payments, debt repayments
        // are currently *not* directly filtered by date for the *report* itself.
        // The report focuses on operational income/expenses for the period.
        // These other flows would typically be part of a cash flow statement or balance sheet.

        // Update and display the report table
        updateReportTable(filteredSales, filteredMESales, filteredExpenses, filteredOthers, filteredSupplies, filteredMobileMoney, filterLabel);
        if (reportDetailsContainer) reportDetailsContainer.style.display = 'block';
        if (showReportDetailsButton) showReportDetailsButton.style.display = 'inline-block'; // Show toggle button
    });


    /** Met à jour la table du bilan. */
    function updateReportTable(papeterieSales, meSales, expenses, others, supplies, mobileMoney, filterLabel) {
         if (!reportTable) return;
         const reportTitleElement = reportDetailsContainer?.querySelector('h3');
         if (reportTitleElement) reportTitleElement.textContent = `Bilan Généré (${filterLabel || 'Période Non Spécifiée'})`;

        reportTable.innerHTML = ''; // Clear previous report

        // Calculate totals for the filtered period
        let totalPapeterieAmount = papeterieSales.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
        let totalPapeterieQuantity = papeterieSales.reduce((sum, item) => sum + (item.quantity || 0), 0);
        let totalMESalesAmount = meSales.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
        let totalMESalesQuantity = meSales.reduce((sum, item) => sum + (item.quantity || 0), 0);
        let totalExpensesAmount = expenses.reduce((sum, item) => sum + (item.amount || 0), 0);

        // Sum 'Others' as a single income/expense line for simplicity in this report
        let totalOthersAmount = others.reduce((sum, item) => sum + (item.totalAmount || 0), 0);
        let othersCount = others.length;

        // Total operational revenue for the period
        const totalRevenu = totalPapeterieAmount + totalMESalesAmount + totalOthersAmount; // Include 'Others' directly

        // Mobile Money calculations for the period
        let totalPerteTransfert = 0, totalPerteCredit = 0, lastMMEntry = null;
        if (mobileMoney.length > 0) {
            // Sort MM entries within the filtered period by date to find the last one
            const sortedMM = [...mobileMoney].sort((a, b) => (a.date || '').localeCompare(b.date || '')); // Ascending sort
            lastMMEntry = sortedMM[sortedMM.length - 1]; // Get the last entry

            // Sum up the losses *over the entire filtered period*
            totalPerteTransfert = mobileMoney.reduce((sum, item) => sum + (item.perteTransfert || 0), 0);
            totalPerteCredit = mobileMoney.reduce((sum, item) => sum + (item.perteCredit || 0), 0);
        }
        const totalPertesMM = totalPerteTransfert + totalPerteCredit;

        // Total operational expenses for the period
        const totalDepensesDirectes = totalExpensesAmount + totalPertesMM; // Direct expenses + MM Losses

        // Net result (Operational Profit/Loss for the period)
        const netResult = totalRevenu - totalDepensesDirectes;

        // Supply costs incurred *during the period*
        let totalSuppliesQuantity = supplies.reduce((sum, item) => sum + (item.quantity || 0), 0);
        let totalSuppliesCost = supplies.reduce((sum, item) => sum + (item.totalAmount || 0), 0);

        // --- Build Report Table ---
        const addRow = (type, detail, quantity, amount, style = {}) => {
            const row = reportTable.insertRow();
            const cellType = row.insertCell(); cellType.textContent = type; cellType.style.fontWeight = style.typeFontWeight || 'normal';
            const cellDetail = row.insertCell(); cellDetail.textContent = detail;
            const qtyCell = row.insertCell(); qtyCell.textContent = quantity; qtyCell.classList.add('quantity-col');
            const amtCell = row.insertCell(); amtCell.textContent = typeof amount === 'number' ? formatAmount(amount) : amount; amtCell.classList.add('amount-col');

             Object.entries(style).forEach(([key, value]) => {
                 // Apply styles directly to row or specific cells if needed
                 if (key === 'rowStyle') { Object.assign(row.style, value); }
                 else if (key === 'amountStyle') { Object.assign(amtCell.style, value); }
                 else { row.style[key] = value; } // Apply directly to row otherwise
             });
        };

        // REVENUS Section
        addRow('Revenus Opérationnels', '', '', '', { backgroundColor: '#e0f2f1', fontWeight: 'bold', rowStyle: { borderTop: '2px solid grey' } });
        addRow(' Ventes Papeterie', `Total ${papeterieSales.length} vente(s)`, totalPapeterieQuantity || '-', totalPapeterieAmount, { rowStyle: { paddingLeft: '15px' } });
        addRow(' Ventes Mat. Élec.', `Total ${meSales.length} vente(s)`, totalMESalesQuantity || '-', totalMESalesAmount, { rowStyle: { paddingLeft: '15px' } });
        addRow(' Opérations Diverses', `Total ${othersCount} op.`, '-', totalOthersAmount, { rowStyle: { paddingLeft: '15px' } });
        addRow(' TOTAL REVENUS', '', '', totalRevenu, { fontWeight: 'bold', rowStyle: { borderTop: '1px solid #ccc', backgroundColor: '#d4edda'} });

        addRow('', '', '', '', { rowStyle: { border: 'none', height: '10px' } }); // Spacer

        // DEPENSES Section
        addRow('Dépenses Opérationnelles', '', '', '', { backgroundColor: '#fbe9e7', fontWeight: 'bold', rowStyle: { borderTop: '2px solid grey' } });
        addRow(' Dépenses Directes', `Total ${expenses.length} dépense(s)`, '-', totalExpensesAmount, { rowStyle: { paddingLeft: '15px' } });
        if (totalPerteTransfert > 0 || totalPerteCredit > 0) {
            addRow(' Pertes Mobile Money', `Total sur période`, '-', totalPertesMM, { rowStyle: { paddingLeft: '15px', color: '#a04040'} });
        }
        addRow(' TOTAL DEPENSES OP.', '', '', totalDepensesDirectes, { fontWeight: 'bold', rowStyle: { borderTop: '1px solid #ccc', backgroundColor: '#f8d7da', color: '#721c24' } });

        addRow('', '', '', '', { rowStyle: { border: 'none', height: '15px' } }); // Spacer

        // RESULTAT NET
        const resultRowStyle = { fontWeight: 'bold', backgroundColor: netResult >= 0 ? '#c3e6cb' : '#f5c6cb', color: netResult >= 0 ? '#155724' : '#721c24', rowStyle: { borderTop: '2px solid black', borderBottom: '2px solid black' } };
        addRow('RESULTAT NET PERIODE', '(Revenus - Dépenses Op.)', '', netResult, resultRowStyle);

        addRow('', '', '', '', { rowStyle: { border: 'none', height: '15px' } }); // Spacer

        // Informations Supplémentaires Section
        addRow('Informations Additionnelles', '', '', '', { backgroundColor: '#e8eaf6', fontWeight: 'bold', rowStyle: { borderTop: '2px solid grey' } });
        const infoStyle = { fontStyle: 'italic', color: '#555', rowStyle: { paddingLeft: '15px', backgroundColor: '#f8f9fa' } };
        if (supplies.length > 0) {
             addRow(' Coût Approvisionnements', `(${supplies.length} appro., ${totalSuppliesQuantity || 0} unités)`, '', totalSuppliesCost, infoStyle);
        }
        if (lastMMEntry) {
            const totalMobileMoneyEndBalance = (lastMMEntry.balanceMoov || 0) + (lastMMEntry.balanceMTN || 0) + (lastMMEntry.balanceCelttis || 0) + (lastMMEntry.balanceCash || 0);
            const totalMobileMoneyCredit = (lastMMEntry.creditMoov || 0) + (lastMMEntry.creditMTN || 0) + (lastMMEntry.creditCelttis || 0);
            addRow(' Solde Final MM Total', `Point du ${lastMMEntry.date}`, '-', totalMobileMoneyEndBalance, infoStyle);
            if (totalMobileMoneyCredit > 0) addRow(' Crédit Final MM Total', `Point du ${lastMMEntry.date}`, '-', totalMobileMoneyCredit, { ...infoStyle, amountStyle: { color: '#cc8400' } });
        } else if (mobileMoney.length === 0 && supplies.length === 0) {
             addRow(' ', 'Aucune info additionnelle pour la période', '-', '-', infoStyle);
        }
    }


    // --- DELETE FUNCTIONS ---
    // Make delete functions globally accessible for onclick handlers
    window.deleteSupply = (index) => {
        if (index < 0 || index >= supplyData.length) return;
        const item = supplyData[index];
        if (confirm(`Supprimer l'approvisionnement du ${item.date || '?'} pour "${item.designation || '?'}" (Qté: ${item.quantity || '?'}) ?\nCeci affectera le stock.`)) {
            const requiresStockUpdate = item.type === 'Papeterie' || item.type === 'Matériels électrique';
            supplyData.splice(index, 1);
            localStorage.setItem('supplyData', JSON.stringify(supplyData));
            updateSupplyTable();
            if (requiresStockUpdate) {
                updateStockTable(); // Recalculates stockData and updates dropdowns inside
            }
            alert('Approvisionnement supprimé.');
        }
    };

    window.deleteSale = (index) => { // Papeterie
         if (index < 0 || index >= salesData.length) return;
         const item = salesData[index];
         if (confirm(`Supprimer la vente Papeterie du ${item.date || '?'} pour "${item.designation || '?'}" (Qté: ${item.quantity || '?'}) ?\nCeci ajoutera la quantité au stock.`)) {
             salesData.splice(index, 1);
             localStorage.setItem('salesData', JSON.stringify(salesData));
             updateSalesTable();
             updateStockTable(); // Recalculate stock
             alert('Vente Papeterie supprimée. Stock mis à jour.');
         }
    };

    window.deleteMaterielElectriqueSale = (index) => { // Mat Elec
        if (index < 0 || index >= materielElectriqueData.length) return;
        const item = materielElectriqueData[index];
        if (confirm(`Supprimer la vente Mat. Elec. du ${item.date || '?'} pour "${item.designation || '?'}" (Qté: ${item.quantity || '?'}) ?\nCeci ajoutera la quantité au stock.`)) {
            materielElectriqueData.splice(index, 1);
            localStorage.setItem('materielElectriqueData', JSON.stringify(materielElectriqueData));
            updateMaterielElectriqueTable();
            updateStockTable(); // Recalculate stock
            alert('Vente Mat. Elec. supprimée. Stock mis à jour.');
        }
    };

    window.deleteExpense = (index) => {
        if (index < 0 || index >= expensesData.length) return;
        const item = expensesData[index];
        if (confirm(`Supprimer la dépense du ${item.date || '?'} ("${item.reason || '?'}", Montant: ${formatAmount(item.amount)}) ?`)) {
            expensesData.splice(index, 1);
            localStorage.setItem('expensesData', JSON.stringify(expensesData));
            updateExpensesTable();
            alert('Dépense supprimée.');
        }
    };

    window.deleteOther = (index) => {
         if (index < 0 || index >= othersData.length) return;
         const item = othersData[index];
        if (confirm(`Supprimer l'opération diverse du ${item.date || '?'} ("${item.designation || '?'}", Montant: ${formatAmount(item.totalAmount)}) ?`)) {
             othersData.splice(index, 1);
             localStorage.setItem('othersData', JSON.stringify(othersData));
             updateOthersTable();
             alert('Opération diverse supprimée.');
         }
    };

    window.deleteEmployee = (index) => {
         if (index < 0 || index >= employeesData.length) return;
         const item = employeesData[index];
         if (confirm(`Supprimer définitivement l'employé: ${item.nom || '?'} ${item.prenom || ''} ?`)) {
             employeesData.splice(index, 1);
             localStorage.setItem('employeesData', JSON.stringify(employeesData));
             updateEmployeesTable();
             alert('Employé supprimé.');
         }
    };

     window.deleteLearner = (index) => {
         if (index < 0 || index >= learnersData.length) return;
         const item = learnersData[index];
         if (confirm(`Supprimer définitivement l'apprenant: ${item.nom || '?'} ${item.prenom || ''} (Filière: ${item.filiere || 'N/A'}) ?`)) {
             learnersData.splice(index, 1);
             localStorage.setItem('learnersData', JSON.stringify(learnersData));
             updateLearnersTable();
             alert('Apprenant supprimé.');
         }
     };

     window.deleteMobileMoney = (originalIndex) => { // Expecting original index now
         if (originalIndex < 0 || originalIndex >= mobileMoneyData.length) {
              console.error("Index invalide pour suppression MM:", originalIndex);
              alert("Impossible de supprimer : index invalide.");
              return;
          }
         const item = mobileMoneyData[originalIndex];
         if (confirm(`Supprimer le point Mobile Money du ${item.date || '?'} (Agent: ${item.agent || '?'}) ?`)) {
             mobileMoneyData.splice(originalIndex, 1);
             localStorage.setItem('mobileMoneyData', JSON.stringify(mobileMoneyData));
             updateMobileMoneyTable(); // Will re-sort and display
             alert('Point Mobile Money supprimé.');
         }
     };

    window.deleteMmFournisseur = (nom, prenom) => {
        // Unescape names passed from onclick attribute
        const safeNom = String(nom || '').replace(/\\'/g, "'");
        const safePrenom = String(prenom || '').replace(/\\'/g, "'");
        if (confirm(`Confirmer la suppression du fournisseur MM ${safeNom} ${safePrenom} ?`)) {
            const initialLength = mmFournisseursData.length;
            mmFournisseursData = mmFournisseursData.filter(f => !(f.nom === safeNom && f.prenom === safePrenom));
            if (mmFournisseursData.length < initialLength) {
                localStorage.setItem('mmFournisseursData', JSON.stringify(mmFournisseursData));
                updateMmFournisseursTable();
                alert(`Fournisseur ${safeNom} ${safePrenom} supprimé.`);
            } else {
                 alert(`Erreur : Fournisseur ${safeNom} ${safePrenom} non trouvé pour suppression.`);
            }
        }
    };

    window.deleteClientProfile = (nom, prenom) => {
        const safeNom = String(nom || '').replace(/\\'/g, "'");
        const safePrenom = String(prenom || '').replace(/\\'/g, "'");
        const clientFullName = `${safeNom} ${safePrenom}`.trim();

        // Check for active (unsettled) credits linked to this client *before* deleting profile
        const hasActiveCredit = creditorsData.some(c => c.name === clientFullName && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) > 0.005));
        if (hasActiveCredit) {
            alert(`Impossible de supprimer le profil de ${clientFullName} car il/elle a des crédits client en cours non soldés.`);
            return;
        }

        if (confirm(`Confirmer la suppression du profil client ${clientFullName} ?\nATTENTION : Ceci est définitif et supprimera aussi les éventuels crédits SOLDÉS associés (pas les crédits EN COURS).`)) {
            const initialLength = clientProfilesData.length;
            clientProfilesData = clientProfilesData.filter(p => !(p.nom === safeNom && p.prenom === safePrenom));

             if (clientProfilesData.length < initialLength) {
                 // Also remove any *settled* creditor entries for this client (optional cleanup)
                 const initialCreditorLength = creditorsData.length;
                 creditorsData = creditorsData.filter(c => !(c.name === clientFullName && ((c.totalAmountDue || 0) - (c.amountPaidTotal || 0) <= 0.005)));
                 const creditorsRemoved = initialCreditorLength - creditorsData.length;

                localStorage.setItem('clientProfilesData', JSON.stringify(clientProfilesData));
                 localStorage.setItem('creditorsData', JSON.stringify(creditorsData)); // Save cleaned creditors
                updateClientProfilesTable();
                populateClientSelect(); // Update dropdown
                 updateCreditorsTable(); // Update creditors table
                alert(`Profil ${clientFullName} supprimé.` + (creditorsRemoved > 0 ? ` ${creditorsRemoved} transaction(s) de crédit soldé(s) associée(s) ont aussi été supprimée(s).` : ''));
             } else {
                 alert(`Erreur : Profil ${clientFullName} non trouvé pour suppression.`);
             }
        }
    };

    window.deleteCreditor = (originalIndex) => { // Expecting original index
         if (originalIndex < 0 || originalIndex >= creditorsData.length) {
              console.error("Index invalide pour suppression Crédit:", originalIndex);
              alert("Impossible de supprimer : index invalide.");
              return;
          }
         const item = creditorsData[originalIndex];
         const remaining = (item.totalAmountDue || 0) - (item.amountPaidTotal || 0);
        if (confirm(`Supprimer TOUTE la transaction crédit pour ${item.name || '?'} ("${item.designation || '?'}")?\nMontant Restant Actuel: ${formatAmount(remaining)}.\nATTENTION : Ceci est irréversible et effacera l'historique de cette ligne de crédit.`)) {
            creditorsData.splice(originalIndex, 1);
            localStorage.setItem('creditorsData', JSON.stringify(creditorsData));
            updateCreditorsTable();
            alert('Transaction crédit supprimée.');
        }
    };

    window.deleteDebt = (originalIndex) => { // Expecting original index
         if (originalIndex < 0 || originalIndex >= debtData.length) {
              console.error("Index invalide pour suppression Dette/Prêt:", originalIndex);
              alert("Impossible de supprimer : index invalide.");
              return;
         }
         const item = debtData[originalIndex];
        if (confirm(`Supprimer définitivement la ${item.type || 'entrée'}: ${item.name || '?'} ("${item.description || '?'}", Montant: ${formatAmount(item.amount)}) ?`)) {
            debtData.splice(originalIndex, 1);
            localStorage.setItem('debtData', JSON.stringify(debtData));
            updateDebtTable();
            alert(`${item.type || 'Entrée'} supprimé(e).`);
        }
    };

    // --- EDIT FUNCTIONS ---
    // Make edit functions globally accessible for onclick handlers
    window.editSupply = (index) => {
        if (index < 0 || index >= supplyData.length) return;
        const item = supplyData[index];
        if (!supplyForm || !supplyEditIndexInput || !supplyDateInput || !supplyTypeSelect || !supplyDesignationInput || !supplyQuantityInput || !supplyUnitPriceInput || !supplyTotalAmountInput) {
             alert("Erreur: Formulaire d'approvisionnement incomplet."); return;
        }

        supplyForm.reset(); // Clear form first
        supplyDateInput.value = item.date || '';
        supplyTypeSelect.value = item.type || '';
        supplyDesignationInput.value = item.designation || '';
        supplyQuantityInput.value = item.quantity || '';
        supplyUnitPriceInput.value = item.unitPrice !== null ? item.unitPrice : '';
        // Recalculate total amount based on loaded values
        calculateTotalAmount(supplyQuantityInput, supplyUnitPriceInput, supplyTotalAmountInput);

        supplyEditIndexInput.value = index; // Set the index to indicate editing mode
        supplyForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Approvisionnement';
        // Scroll form into view for user convenience
        supplySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.editEmployee = (index) => {
        if (index < 0 || index >= employeesData.length) return;
        const employee = employeesData[index];
        if (!employeeForm || !employeeEditIndexInput) { alert("Erreur: Formulaire employé introuvable."); return; }

        employeeForm.reset(); // Clear previous values
        // Populate all fields from the employee data object
        if(employeeNomInput) employeeNomInput.value = employee.nom || '';
        if(employeePrenomInput) employeePrenomInput.value = employee.prenom || '';
        if(employeeRoleInput) employeeRoleInput.value = employee.statut || '';
        if(employeeAdresseInput) employeeAdresseInput.value = employee.adresse || '';
        if(employeeTelephoneInput) employeeTelephoneInput.value = employee.telephone || '';
        if(employeeLieuResidenceInput) employeeLieuResidenceInput.value = employee.lieuResidence || '';
        if(employeeJoursTravailInput) employeeJoursTravailInput.value = employee.joursTravail || '';
        if(employeeHeureArriveeInput) employeeHeureArriveeInput.value = employee.heureArrivee || '';
        if(employeeHeureDepartInput) employeeHeureDepartInput.value = employee.heureDepart || '';
        if(employeeSalaryInput) employeeSalaryInput.value = employee.salary !== null ? employee.salary : '';
        if(employeePaidAmountInput) employeePaidAmountInput.value = employee.paidAmount || ''; // Show current paid amount
        if(employeeHireDateInput) employeeHireDateInput.value = employee.hireDate || '';
        if(employeeContactPersonNomInput) employeeContactPersonNomInput.value = employee.contactPersonNom || '';
        if(employeeContactPersonPrenomInput) employeeContactPersonPrenomInput.value = employee.contactPersonPrenom || '';
        if(employeeContactPersonAdresseInput) employeeContactPersonAdresseInput.value = employee.contactPersonAdresse || '';
        if(employeeContactPersonTelephoneInput) employeeContactPersonTelephoneInput.value = employee.contactPersonTelephone || '';
        if(employeeContactPersonLieuResidenceInput) employeeContactPersonLieuResidenceInput.value = employee.contactPersonLieuResidence || '';

        employeeEditIndexInput.value = index; // Set edit mode index
        employeeForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Employé';
        employeesSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    window.editLearner = (index) => {
         if (index < 0 || index >= learnersData.length) return;
         const learner = learnersData[index];
         if (!learnerForm || !learnerEditIndexInput) { alert("Erreur: Formulaire apprenant introuvable."); return; }

         learnerForm.reset();
         // Populate all learner fields
         if(learnerNomInput) learnerNomInput.value = learner.nom || '';
         if(learnerPrenomInput) learnerPrenomInput.value = learner.prenom || '';
         if(learnerAgeInput) learnerAgeInput.value = learner.age !== null ? learner.age : '';
         if(learnerAdresseInput) learnerAdresseInput.value = learner.adresse || '';
         if(learnerLieuResidenceInput) learnerLieuResidenceInput.value = learner.lieuResidence || '';
         if(learnerNiveauEtudesInput) learnerNiveauEtudesInput.value = learner.niveauEtudes || '';
         if(learnerSituationMatrimonialeSelect) learnerSituationMatrimonialeSelect.value = learner.situationMatrimoniale || '';
         if(learnerPereNomInput) learnerPereNomInput.value = learner.pereNom || '';
         if(learnerPerePrenomInput) learnerPerePrenomInput.value = learner.perePrenom || '';
         if(learnerMereNomInput) learnerMereNomInput.value = learner.mereNom || '';
         if(learnerMerePrenomInput) learnerMerePrenomInput.value = learner.merePrenom || '';
         if(learnerFiliereInput) learnerFiliereInput.value = learner.filiere || '';
         if(learnerDureeFormationInput) learnerDureeFormationInput.value = learner.dureeFormation || '';
         // Populate payment fields with current recorded values
         if(learnerFraisDocumentsInput) learnerFraisDocumentsInput.value = learner.fraisDocuments || '';
         if(learnerTranche1Input) learnerTranche1Input.value = learner.tranche1 || '';
         if(learnerTranche2Input) learnerTranche2Input.value = learner.tranche2 || '';
         if(learnerTranche3Input) learnerTranche3Input.value = learner.tranche3 || '';
         if(learnerTranche4Input) learnerTranche4Input.value = learner.tranche4 || '';
         if(learnerGarantNomInput) learnerGarantNomInput.value = learner.garantNom || '';
         if(learnerGarantPrenomInput) learnerGarantPrenomInput.value = learner.garantPrenom || '';
         if(learnerGarantTelephoneInput) learnerGarantTelephoneInput.value = learner.garantTelephone || '';
         if(learnerGarantAdresseInput) learnerGarantAdresseInput.value = learner.garantAdresse || '';

         learnerEditIndexInput.value = index;
         learnerForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Apprenant';
         learnersSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

     window.editMobileMoney = (originalIndex) => { // Expecting original index
         if (originalIndex < 0 || originalIndex >= mobileMoneyData.length) {
              console.error("Index invalide pour édition MM:", originalIndex);
              alert("Impossible de modifier : index invalide.");
              return;
          }
         const item = mobileMoneyData[originalIndex];
         if (!mobileMoneyForm || !mobileMoneyEditIndexInput) { alert("Erreur: Formulaire Mobile Money introuvable."); return; }

         mobileMoneyForm.reset();
         // Populate MM point fields
         if(mmDateInput) mmDateInput.value = item.date || '';
         if(mmAgentInput) mmAgentInput.value = item.agent || '';
         if(mmBalanceMoovInput) mmBalanceMoovInput.value = item.balanceMoov || '';
         if(mmBalanceMtnInput) mmBalanceMtnInput.value = item.balanceMTN || '';
         if(mmBalanceCelttisInput) mmBalanceCelttisInput.value = item.balanceCelttis || '';
         if(mmBalanceCashInput) mmBalanceCashInput.value = item.balanceCash || '';
         if(mmCreditMoovInput) mmCreditMoovInput.value = item.creditMoov || '';
         if(mmCreditMtnInput) mmCreditMtnInput.value = item.creditMTN || '';
         if(mmCreditCelttisInput) mmCreditCelttisInput.value = item.creditCelttis || '';
         if(mmPerteTransfertInput) mmPerteTransfertInput.value = item.perteTransfert || '';
         if(mmPerteCreditInput) mmPerteCreditInput.value = item.perteCredit || '';

         mobileMoneyEditIndexInput.value = originalIndex; // Use original index for saving
         mobileMoneyForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Point MM';
         mobileMoneySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
     };

     window.editMmFournisseur = (nom, prenom) => {
         const safeNom = String(nom || '').replace(/\\'/g, "'");
         const safePrenom = String(prenom || '').replace(/\\'/g, "'");
         const key = `${safeNom}_${safePrenom}`; // Key uses original names
         const fournisseur = mmFournisseursData.find(f => f.nom === safeNom && f.prenom === safePrenom);

         if (fournisseur && mmFournisseurForm && mmFournisseurEditKeyInput) {
             mmFournisseurForm.reset();
             // Populate fournisseur fields
             if(mmFournisseurNomInput) mmFournisseurNomInput.value = fournisseur.nom || '';
             if(mmFournisseurPrenomInput) mmFournisseurPrenomInput.value = fournisseur.prenom || '';
             if(mmFournisseurContactInput) mmFournisseurContactInput.value = fournisseur.contact || '';
             if(mmFournisseurMontantInput) mmFournisseurMontantInput.value = fournisseur.montantFourni || '';
             if(mmFournisseurInteretInput) mmFournisseurInteretInput.value = fournisseur.interet !== null ? fournisseur.interet : '';
             if(mmFournisseurVenduInput) mmFournisseurVenduInput.value = fournisseur.creditVendu || '';

             mmFournisseurEditKeyInput.value = key; // Set key for update logic
             mmFournisseurForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Fournisseur';
             mmFournisseurForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
         } else {
             alert(`Fournisseur ${safeNom} ${safePrenom} non trouvé ou formulaire incomplet.`);
             if(mmFournisseurEditKeyInput) mmFournisseurEditKeyInput.value = ''; // Clear key if error
         }
     };

     window.editClientProfile = (nom, prenom) => {
         const safeNom = String(nom || '').replace(/\\'/g, "'");
         const safePrenom = String(prenom || '').replace(/\\'/g, "'");
         const key = `${safeNom}_${safePrenom}`;
         const profile = clientProfilesData.find(p => p.nom === safeNom && p.prenom === safePrenom);

          if (profile && clientProfileForm && clientProfileEditKeyInput) {
              clientProfileForm.reset();
              // Populate profile fields
              if(clientProfileNomInput) clientProfileNomInput.value = profile.nom || '';
              if(clientProfilePrenomInput) clientProfilePrenomInput.value = profile.prenom || '';
              if(clientProfileAdresseInput) clientProfileAdresseInput.value = profile.adresse || '';
              if(clientProfileContactInput) clientProfileContactInput.value = profile.contact || '';
              if(clientProfileStatutInput) clientProfileStatutInput.value = profile.statut || '';

              clientProfileEditKeyInput.value = key;
              clientProfileForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Profil';
              clientProfileForm?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
             alert(`Profil ${safeNom} ${safePrenom} non trouvé ou formulaire incomplet.`);
              if(clientProfileEditKeyInput) clientProfileEditKeyInput.value = '';
          }
     };

    window.editDebt = (originalIndex) => { // Expecting original index
         if (originalIndex < 0 || originalIndex >= debtData.length) {
              console.error("Index invalide pour édition Dette/Prêt:", originalIndex);
               alert("Impossible de modifier : index invalide.");
              return;
         }
         const item = debtData[originalIndex];
         if (!debtForm || !debtEditIndexInput) { alert("Erreur: Formulaire Dette/Prêt introuvable."); return; }

         debtForm.reset();
         // Populate debt/loan fields
         if(debtDateInput) debtDateInput.value = item.date || '';
         if(debtTypeSelect) debtTypeSelect.value = item.type || '';
         if(debtNameInput) debtNameInput.value = item.name || '';
         if(debtDescriptionInput) debtDescriptionInput.value = item.description || '';
         if(debtAmountInput) debtAmountInput.value = item.amount || '';
         if(debtDueDateInput) debtDueDateInput.value = item.dueDate || '';
         if(debtStatusSelect) debtStatusSelect.value = item.status || '';

         debtEditIndexInput.value = originalIndex; // Use original index
         debtForm.querySelector('button[type="submit"]').textContent = 'Mettre à Jour Dette/Prêt';
         debtSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };


    // --- PAYMENT RECORDING FUNCTIONS ---
    window.recordSalaryPayment = (index) => {
        if (index < 0 || index >= employeesData.length) return;
        const employee = employeesData[index];
        const salary = employee.salary !== null ? parseFloat(employee.salary) : 0;
        const totalPaid = employee.paidAmount || 0;
        const remaining = salary - totalPaid;

        const paymentDate = prompt("Entrez la date du paiement (AAAA-MM-JJ) :", new Date().toISOString().split('T')[0]);
        if (!paymentDate || !/^\d{4}-\d{2}-\d{2}$/.test(paymentDate)) {
             if (paymentDate !== null) alert("Format de date invalide. Utilisez AAAA-MM-JJ.");
             return; // User cancelled or invalid date
         }

        const amountStr = prompt(`Employé: ${employee.nom || ''} ${employee.prenom || ''}\nSalaire: ${formatAmount(salary)}\nDéjà Payé: ${formatAmount(totalPaid)}\nRestant Dû: ${formatAmount(remaining)}\n\nMontant payé ce jour :`, remaining > 0 ? formatAmount(remaining) : '0.00');
        if (amountStr === null) return; // User cancelled

        const amountPaidThisTime = parseFloat(amountStr);
        if (isNaN(amountPaidThisTime) || amountPaidThisTime < 0) {
            alert("Montant invalide. Entrez un nombre positif ou zéro.");
            return;
        }
        // Use a small tolerance for floating point comparisons
        if (amountPaidThisTime > remaining + 0.005) {
             alert(`Le montant payé (${formatAmount(amountPaidThisTime)}) dépasse le solde restant dû (${formatAmount(remaining)}).`);
             return;
        }
        if (amountPaidThisTime <= 0) {
             alert("Aucun paiement enregistré (montant <= 0).");
             return;
        }

        // Update data: Add the new payment to the existing total
        employee.paidAmount = (employee.paidAmount || 0) + amountPaidThisTime;
        // Optionally track last payment date
        // employee.lastPaymentDate = paymentDate; // Add this field to employeeData if needed

        localStorage.setItem('employeesData', JSON.stringify(employeesData));
        updateEmployeesTable(); // Refresh table view

        alert(`Paiement de ${formatAmount(amountPaidThisTime)} enregistré pour ${employee.nom} ${employee.prenom}.`);

        // Ask to print invoice
        if (confirm('Imprimer un reçu pour ce paiement ?')) {
            printSalaryInvoice(index, paymentDate, amountPaidThisTime);
        }
    };

    window.recordTranchePayment = (index) => {
        if (index < 0 || index >= learnersData.length) return;
        const learner = learnersData[index];

         const paymentDate = prompt("Entrez la date du paiement (AAAA-MM-JJ) :", new Date().toISOString().split('T')[0]);
         if (!paymentDate || !/^\d{4}-\d{2}-\d{2}$/.test(paymentDate)) {
              if (paymentDate !== null) alert("Format de date invalide. Utilisez AAAA-MM-JJ.");
              return;
          }

         const paymentReason = prompt(`Paiement pour ${learner.nom} ${learner.prenom}.\nEntrez un motif/description pour ce paiement (Ex: Tranche 1, Frais Documents):`, "Paiement Tranche");
         if (!paymentReason) return; // User cancelled

         const amountStr = prompt("Montant payé ce jour :");
         if (amountStr === null) return;
         const amountPaidThisTime = parseFloat(amountStr);

         if (isNaN(amountPaidThisTime) || amountPaidThisTime <= 0) {
             alert("Montant invalide. Entrez un nombre positif."); return;
         }

         // --- Recording Logic ---
         // Option: Add to a general 'totalPaid' field or update specific tranche fields.
         // For simplicity here, we will demonstrate updating a *specific* field,
         // but a more robust system might add a payment history array.

         const trancheChoice = prompt(
             `A quelle ligne ce paiement de ${formatAmount(amountPaidThisTime)} correspond-il ?\n` +
             `1. Frais Docs (Actuel: ${formatAmount(learner.fraisDocuments)})\n` +
             `2. Tranche 1 (Actuel: ${formatAmount(learner.tranche1)})\n` +
             `3. Tranche 2 (Actuel: ${formatAmount(learner.tranche2)})\n` +
             `4. Tranche 3 (Actuel: ${formatAmount(learner.tranche3)})\n` +
             `5. Tranche 4 (Actuel: ${formatAmount(learner.tranche4)})\n` +
             `Entrez le numéro (1-5). ATTENTION: Ceci ajoutera au montant actuel.` // Changed to ADD instead of overwrite
         );
        if (!trancheChoice) return;
        const choice = parseInt(trancheChoice);
        if (isNaN(choice) || choice < 1 || choice > 5) {
            alert("Choix invalide."); return;
        }

         let updated = false;
         switch (choice) {
             case 1: learner.fraisDocuments = (learner.fraisDocuments || 0) + amountPaidThisTime; updated = true; break;
             case 2: learner.tranche1 = (learner.tranche1 || 0) + amountPaidThisTime; updated = true; break;
             case 3: learner.tranche2 = (learner.tranche2 || 0) + amountPaidThisTime; updated = true; break;
             case 4: learner.tranche3 = (learner.tranche3 || 0) + amountPaidThisTime; updated = true; break;
             case 5: learner.tranche4 = (learner.tranche4 || 0) + amountPaidThisTime; updated = true; break;
         }

        if (updated) {
            localStorage.setItem('learnersData', JSON.stringify(learnersData));
            updateLearnersTable();
            alert(`Paiement de ${formatAmount(amountPaidThisTime)} enregistré pour ${paymentReason} - ${learner.nom}. Le montant a été ajouté à la ligne choisie.`);
             if (confirm('Imprimer un reçu pour ce paiement ?')) {
                 // Pass the reason entered by the user for the description
                 printLearnerInvoice(index, paymentDate, paymentReason, amountPaidThisTime);
             }
        }
    };

    // --- INVOICE FUNCTIONS ---

    /** Generates and prints a salary receipt */
    function printSalaryInvoice(employeeIndex, paymentDate, amountPaidThisTime) {
         if (employeeIndex < 0 || employeeIndex >= employeesData.length) return;
         const employee = employeesData[employeeIndex];
         const invoiceArea = document.getElementById('invoice-print-area');
         if (!invoiceArea) { alert("Erreur: Zone d'impression de reçu introuvable."); return;}

         const salary = employee.salary !== null ? parseFloat(employee.salary) : 0;
         const totalPaid = employee.paidAmount || 0; // This is the updated total paid *after* the current payment
         const remaining = salary - totalPaid;
         const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

         // ** IMPORTANT: Replace placeholders with your actual company info **
         const companyName = "La Charité Modeste";
         const companyAddress = "Votre Adresse Complète Ici";
         const companyPhone = "Votre Numéro de Téléphone";
         const companyEmail = "Votre Adresse Email";
         // ** --------------------------------------------------------- **


         const invoiceHTML = `
            <div class="invoice-header">
                <div>
                    <img src="logo.jpg" alt="Logo" class="invoice-logo" style="max-height: 60px; margin-bottom: 10px;"> <!-- Adjust size -->
                    <div class="invoice-details" style="font-size: 9pt; line-height: 1.3;">
                        <strong>${companyName}</strong><br>
                        ${companyAddress}<br>
                        Tél: ${companyPhone}<br>
                        ${companyEmail ? `Email: ${companyEmail}` : ''}
                    </div>
                </div>
                <div class="invoice-title" style="text-align: right;">
                    <h2 style="margin-bottom: 5px;">Reçu de Paiement de Salaire</h2>
                    <div class="invoice-details" style="font-size: 9pt;">
                        Date d'émission: ${today}<br>
                        Date de paiement: ${paymentDate || '-'}<br>
                        Reçu #: EMP-${employeeIndex}-${Date.now().toString().slice(-5)}
                    </div>
                </div>
            </div>
            <hr style="margin: 15px 0;">
            <div class="invoice-client-details" style="margin-bottom: 15px; font-size: 10pt;">
                 <strong>Employé:</strong><br>
                 ${employee.nom || ''} ${employee.prenom || ''}<br>
                 ${employee.statut ? `Statut: ${employee.statut}<br>` : ''}
                 ${employee.telephone ? `Contact: ${employee.telephone}<br>` : ''}
            </div>
            <div class="invoice-items">
                <h4 style="margin-bottom: 5px; font-size: 10pt;">Détail du Paiement</h4>
                <table style="font-size: 10pt;">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th class="amount" style="text-align: right;">Montant Payé</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Paiement de salaire (Effectué le: ${paymentDate || '-'})</td>
                            <td class="amount" style="text-align: right;">${formatAmount(amountPaidThisTime)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="invoice-summary" style="margin-top: 20px; font-size: 10pt;">
                 Salaire de base (si défini): <strong style="float: right;">${employee.salary !== null ? formatAmount(salary) : 'N/A'}</strong><br style="clear: both;">
                 Montant payé ce jour: <strong style="float: right;">${formatAmount(amountPaidThisTime)}</strong><br style="clear: both;">
                 Total payé (cumulé à ce jour): <strong style="float: right;">${formatAmount(totalPaid)}</strong><br style="clear: both;">
                 <hr style="margin: 5px 0;">
                 Solde restant dû: <strong style="float: right; font-size: 1.1em; color: ${remaining <= 0.005 ? 'green' : 'red'};">${formatAmount(remaining)}</strong><br style="clear: both;">
            </div>
            <div class="invoice-footer" style="margin-top: 30px; font-size: 8pt; text-align: center;">
                 Reçu généré le ${today}. Merci pour votre collaboration.
            </div>
         `;
         invoiceArea.innerHTML = invoiceHTML;
         printElement('invoice-print-area'); // Use the generic print function
    }

     /** Generates and prints a learner tranche receipt */
    function printLearnerInvoice(learnerIndex, paymentDate, paymentReason, amountPaidThisTime) {
         if (learnerIndex < 0 || learnerIndex >= learnersData.length) return;
         const learner = learnersData[learnerIndex];
         const invoiceArea = document.getElementById('invoice-print-area');
         if (!invoiceArea) { alert("Erreur: Zone d'impression de reçu introuvable."); return;}

         const fraisDocs = learner.fraisDocuments || 0;
         const tranchesPayees = [learner.tranche1 || 0, learner.tranche2 || 0, learner.tranche3 || 0, learner.tranche4 || 0];
         // Calculate total paid *after* this payment was recorded
         const totalPaid = fraisDocs + tranchesPayees.reduce((sum, val) => sum + val, 0);
         const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

         // ** IMPORTANT: Replace placeholders with your actual company info **
         const companyName = "La Charité Modeste";
         const companyAddress = "Votre Adresse Complète Ici";
         const companyPhone = "Votre Numéro de Téléphone";
         const companyEmail = "Votre Adresse Email";
         // ** --------------------------------------------------------- **

         // Note: Total Expected and Remaining are hard to calculate accurately without knowing the total formation cost.
         // const totalExpected = "[Montant Total Formation]"; // Need this value from somewhere
         // const remaining = "[Solde Restant]"; // Calculated as totalExpected - totalPaid

         const invoiceHTML = `
             <div class="invoice-header">
                 <div>
                     <img src="logo.jpg" alt="Logo" class="invoice-logo" style="max-height: 60px; margin-bottom: 10px;">
                     <div class="invoice-details" style="font-size: 9pt; line-height: 1.3;">
                         <strong>${companyName}</strong><br>
                         ${companyAddress}<br>
                         Tél: ${companyPhone}<br>
                         ${companyEmail ? `Email: ${companyEmail}` : ''}
                     </div>
                 </div>
                 <div class="invoice-title" style="text-align: right;">
                     <h2 style="margin-bottom: 5px;">Reçu de Paiement Formation</h2>
                     <div class="invoice-details" style="font-size: 9pt;">
                         Date d'émission: ${today}<br>
                         Date de paiement: ${paymentDate || '-'}<br>
                         Reçu #: LRN-${learnerIndex}-${Date.now().toString().slice(-5)}
                     </div>
                 </div>
             </div>
              <hr style="margin: 15px 0;">
             <div class="invoice-client-details" style="margin-bottom: 15px; font-size: 10pt;">
                  <strong>Apprenant:</strong><br>
                  ${learner.nom || ''} ${learner.prenom || ''}<br>
                  Filière: ${learner.filiere || '-'}<br>
                   ${learner.telephone ? `Contact Apprenant: ${learner.telephone}<br>` : ''} <!-- Assuming learner has tel field -->
                   ${learner.garantTelephone ? `Contact Garant: ${learner.garantTelephone}<br>` : ''}
             </div>
             <div class="invoice-items">
                  <h4 style="margin-bottom: 5px; font-size: 10pt;">Détail du Paiement</h4>
                 <table style="font-size: 10pt;">
                     <thead>
                         <tr>
                             <th>Description</th>
                             <th class="amount" style="text-align: right;">Montant Payé</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr>
                             <td>${paymentReason || 'Paiement Formation'} (Effectué le: ${paymentDate || '-'})</td>
                             <td class="amount" style="text-align: right;">${formatAmount(amountPaidThisTime)}</td>
                         </tr>
                     </tbody>
                 </table>
             </div>
             <div class="invoice-summary" style="margin-top: 20px; font-size: 10pt;">
                  Montant payé ce jour: <strong style="float: right;">${formatAmount(amountPaidThisTime)}</strong><br style="clear: both;">
                  <!-- Total Formation Prévu: <strong style="float: right;">${totalExpected}</strong><br style="clear: both;"> -->
                  Total cumulé payé (enregistré): <strong style="float: right;">${formatAmount(totalPaid)}</strong><br style="clear: both;">
                  <!-- Solde restant: <strong style="float: right; font-size: 1.1em;">${remaining}</strong><br style="clear: both;"> -->
                  <br>
             </div>
              <div class="invoice-items" style="margin-top: 15px;">
                  <h4 style="font-size: 10pt; margin-bottom: 5px; border-bottom: none;">Situation des paiements enregistrés à ce jour :</h4>
                  <table style="font-size: 9pt;">
                      <thead>
                          <tr><th>Item</th><th class="amount" style="text-align: right;">Montant Enregistré</th></tr>
                      </thead>
                      <tbody>
                          <tr><td>Frais Documents</td><td class="amount" style="text-align: right;">${formatAmount(fraisDocs)}</td></tr>
                          <tr><td>Tranche 1</td><td class="amount" style="text-align: right;">${formatAmount(learner.tranche1)}</td></tr>
                          <tr><td>Tranche 2</td><td class="amount" style="text-align: right;">${formatAmount(learner.tranche2)}</td></tr>
                          <tr><td>Tranche 3</td><td class="amount" style="text-align: right;">${formatAmount(learner.tranche3)}</td></tr>
                          <tr><td>Tranche 4</td><td class="amount" style="text-align: right;">${formatAmount(learner.tranche4)}</td></tr>
                          <tr style="font-weight: bold; border-top: 1px solid #ccc;"><td >Total Enregistré</td><td class="amount" style="text-align: right;">${formatAmount(totalPaid)}</td></tr>
                      </tbody>
                  </table>
             </div>
             <div class="invoice-footer" style="margin-top: 30px; font-size: 8pt; text-align: center;">
                  Reçu généré le ${today}. Bonne continuation dans votre formation.
             </div>
         `;
         invoiceArea.innerHTML = invoiceHTML;
         printElement('invoice-print-area');
    }

     /** Generates and prints a client credit receipt/statement */
    window.printCreditReceipt = (originalIndex) => { // Made global for onclick
         if (originalIndex < 0 || originalIndex >= creditorsData.length) {
              console.error("Index invalide pour reçu Crédit:", originalIndex);
              alert("Impossible d'imprimer : index invalide.");
              return;
         }
         const creditor = creditorsData[originalIndex];
         const invoiceArea = document.getElementById('invoice-print-area');
         if (!invoiceArea) { alert("Erreur: Zone d'impression de reçu introuvable."); return;}

         const totalDue = creditor.totalAmountDue || 0;
         const totalPaid = creditor.amountPaidTotal || 0;
         const remaining = totalDue - totalPaid;
         const lastOpDate = creditor.lastPaymentDate || creditor.date || 'N/A';
         const initialDate = creditor.date || 'N/A';
         const today = new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });

         // Find client profile for address/contact
         const clientProfile = clientProfilesData.find(p => `${p.nom || ''} ${p.prenom || ''}`.trim() === creditor.name);
         const clientContact = clientProfile ? clientProfile.contact : '-';
         const clientAddress = clientProfile ? clientProfile.adresse : '-';

          // ** IMPORTANT: Replace placeholders with your actual company info **
         const companyName = "La Charité Modeste";
         const companyAddress = "Votre Adresse Complète Ici";
         const companyPhone = "Votre Numéro de Téléphone";
         const companyEmail = "Votre Adresse Email";
         // ** --------------------------------------------------------- **


         const invoiceHTML = `
             <div class="invoice-header">
                 <div>
                     <img src="logo.jpg" alt="Logo" class="invoice-logo" style="max-height: 60px; margin-bottom: 10px;">
                     <div class="invoice-details" style="font-size: 9pt; line-height: 1.3;">
                         <strong>${companyName}</strong><br>
                         ${companyAddress}<br>
                         Tél: ${companyPhone}<br>
                         ${companyEmail ? `Email: ${companyEmail}` : ''}
                     </div>
                 </div>
                 <div class="invoice-title" style="text-align: right;">
                     <h2 style="margin-bottom: 5px;">Relevé de Compte Crédit</h2>
                     <div class="invoice-details" style="font-size: 9pt;">
                         Date d'émission: ${today}<br>
                         Date dernière opération: ${lastOpDate}<br>
                         Référence Transaction: CRD-${originalIndex}-${Date.now().toString().slice(-5)}
                     </div>
                 </div>
             </div>
              <hr style="margin: 15px 0;">
             <div class="invoice-client-details" style="margin-bottom: 15px; font-size: 10pt;">
                  <strong>Client:</strong><br>
                  ${creditor.name || '-'}<br>
                  ${clientAddress && clientAddress !== '-' ? `Adresse: ${clientAddress}<br>` : ''}
                  ${clientContact && clientContact !== '-' ? `Contact: ${clientContact}<br>` : ''}
             </div>
             <div class="invoice-items">
                  <h4 style="margin-bottom: 5px; font-size: 10pt;">Détail de la Transaction Initiale (Date: ${initialDate})</h4>
                 <table style="font-size: 10pt;">
                     <thead>
                         <tr>
                             <th>Désignation Produit/Service</th>
                             <th style="text-align: center;">Qté</th>
                             <th class="amount" style="text-align: right;">PU</th>
                             <th class="amount" style="text-align: right;">Montant Dû Initial</th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr>
                             <td>${creditor.designation || '-'}</td>
                             <td style="text-align:center;">${creditor.quantity !== null ? creditor.quantity : '-'}</td>
                             <td class="amount" style="text-align: right;">${creditor.unitPrice !== null ? formatAmount(creditor.unitPrice) : '-'}</td>
                             <td class="amount" style="text-align: right;">${formatAmount(totalDue)}</td>
                         </tr>
                         <!-- Note: A full payment history list would be better here if tracked -->
                     </tbody>
                 </table>
             </div>
             <div class="invoice-summary" style="margin-top: 20px; font-size: 10pt;">
                  Montant Total Dû Initial: <strong style="float: right;">${formatAmount(totalDue)}</strong><br style="clear: both;">
                  Total Payé (cumulé à ce jour): <strong style="float: right;">${formatAmount(totalPaid)}</strong><br style="clear: both;">
                  <hr style="margin: 5px 0;">
                  Solde Restant: <strong style="float: right; font-size: 1.1em; color: ${remaining <= 0.005 ? 'green' : 'red'};">${formatAmount(remaining)}</strong><br style="clear: both;">
                  ${creditor.dueDate ? `Date d'échéance prévue: <strong style="float: right;">${creditor.dueDate}</strong><br style="clear: both;">` : ''}
             </div>
             <div class="invoice-footer" style="margin-top: 30px; font-size: 8pt; text-align: center;">
                  Relevé généré le ${today}. Merci de votre confiance. Nous vous remercions de bien vouloir régler le solde restant dans les meilleurs délais.
             </div>
         `;
         invoiceArea.innerHTML = invoiceHTML;
         printElement('invoice-print-area');
    };


    // --- Initialisation ---
    initializeData();

});