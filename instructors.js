
const workbook = XLSX.utils.book_new();

//instructors
function showPopup() {
    $('#Ipopup').show();
  }
  
  
  function closePopup() {
    $('#Ipopup').hide();
  }
  
  
  function addInstructor() {
    const fullName = $('#Ifull_Name').val().trim();
    const modules = $('#Imodules').val().trim();
    const phoneNo = $('#IPhone_No').val().trim();
    const email = $('#IEmail_Address').val().trim();
    const rate = $('#IRate').val().trim();
  
    if (!fullName || !modules || !phoneNo || !email || !rate) {
      return;
    }
  
    const row = `<tr>
                  <td><input type="checkbox" class="checkbox" /></td>
                  <td>${fullName}</td>
                  <td>${modules}</td>
                  <td>${phoneNo}</td>
                  <td>${email}</td>
                  <td>${rate}</td>
                  <td>
                    <button class="edit-btn">Edit</button>
                    <a href="/instructor-profile">View Profile</a>
                  </td>
                </tr>`;
  
    $('#instructorTableBody').append(row);
  
    
    const count = $('#instructorTableBody tr').length;
    $('#instructorsCounter').text(count);
    $('#Ifull_Name').val('');
    $('#Imodules').val('');
    $('#IPhone_No').val('');
    $('#IEmail_Address').val('');
    $('#IRate').val('');

  
    closePopup();
  }
  

  $('#Ipopup form').on('submit', function(event) {
    event.preventDefault();
    addInstructor();
  });
  
  
  function editRow(row) {
    const fullName = row.find('.full-name').text();
    const modules = row.find('.modules').text();
    const phoneNo = row.find('.phone-no').text();
    const email = row.find('.email').text();
    const rate = row.find('.rate').text();
  
    $('#Ifull_Name').val(fullName);
    $('#Imodules').val(modules);
    $('#IPhone_No').val(phoneNo);
    $('#IEmail_Address').val(email);
    $('#IRate').val(rate);
  
    // remove the original row
    row.remove();
  
    showPopup();
  
    // save the edited row on submit
    $('#Ipopup form').on('submit', function(event) {
      event.preventDefault();
      const editedFullName = $('#Ifull_Name').val().trim();
      const editedModules = $('#Imodules').val().trim();
      const editedPhoneNo = $('#IPhone_No').val().trim();
      const editedEmail = $('#IEmail_Address').val().trim();
      const editedRate = $('#IRate').val().trim();
  
      if (!editedFullName || !editedModules || !editedPhoneNo || !editedEmail || !editedRate) {
        return;
      }
  
      const editedRow = `<tr>
                          <td><input type="checkbox" class="checkbox" /></td>
                          <td class="full-name">${editedFullName}</td>
                          <td class="modules">${editedModules}</td>
                          <td class="phone-no">${editedPhoneNo}</td>
                          <td class="email">${editedEmail}</td>
                          <td class="rate">${editedRate}</td>
                          <td>
                            <button class="edit-btn">Edit</button>
                            <a href="/instructor-profile">View Profile</a>
                          </td>
                        </tr>`;
  
      // insert the edited row before the next row
      row.after(editedRow);
  
      // update the counter
      const count = $('#instructorTableBody tr').length;
      $('#instructorsCounter').text(count);
  
      // clear the form and close the popup
      $('#Ifull_Name').val('');
      $('#Imodules').val('');
      $('#IPhone_No').val('');
      $('#IEmail_Address').val('');
      $('#IRate').val('');
      closePopup();
    });
  }
  
  $(document).on('click', '.edit-btn', function() {
    const row = $(this).closest('tr');
    editRow(row);
  });
  
  
  function deleteSelected() {
    const checkboxes = $('.checkbox:checked');
    const rows = checkboxes.closest('tr');
  
    if (rows.length === 0) {
      alert('Please select at least one row to delete');
      return;
    }
  
    rows.remove();
  
    // Decrement the counter
    const count = $('#instructorTableBody tr').length;
    $('#instructorsCounter').text(count);
  }
  

  function displaySheetData(sheetData) {
    const tbody = $('#instructorTableBody');
    tbody.empty(); // clear existing rows
  
    sheetData.forEach((rowData) => {
      const fullName = rowData['Full Name'];
      const modules = rowData['Modules'];
      const phoneNo = rowData['Phone No'];
      const email = rowData['Email Address'];
      const rate = rowData['Rate'];
  
      const row = `<tr>
                    <td><input type="checkbox" class="checkbox" /></td>
                    <td>${fullName}</td>
                    <td>${modules}</td>
                    <td>${phoneNo}</td>
                    <td>${email}</td>
                    <td>${rate}</td>
                    <td>
                      <button class="edit-btn">Edit</button>
                      <a href="/instructor-profile">View Profile</a>
                    </td>
                  </tr>`;
      tbody.append(row);
    });
  }
  
  function uploadSheet() {
    const input = document.getElementById('uploadInput');
    const file = input.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
  
      displaySheetData(sheetData);
    };
  
    reader.readAsBinaryString(file);
  }
  

  function selectAllRows() {
    const selectAllCheckbox = $('#selectAllCheckbox');
    const checkboxes = $('.checkbox');
  
    checkboxes.prop('checked', selectAllCheckbox.prop('checked'));
  }

  function exportTableToExcel(instructorTableBody) {
    let filename = 'table.xlsx';
    let wb = XLSX.utils.table_to_book(document.getElementById(instructorTableBody));
    XLSX.writeFile(wb, filename);
    
  }
  




















