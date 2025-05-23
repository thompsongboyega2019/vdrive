document.addEventListener("DOMContentLoaded", function (e) {
  let s,
    a,
    n,
    r =
      ((s = config.colors.borderColor),
      (a = config.colors.bodyBg),
      (n = config.colors.headingColor),
      document.querySelector(".datatables-order")),
    o = {
      1: { title: "Dispatched", class: "bg-label-warning" },
      2: { title: "Delivered", class: "bg-label-success" },
      3: { title: "Out for Delivery", class: "bg-label-primary" },
      4: { title: "Ready to Pickup", class: "bg-label-info" },
    },
    l = {
      1: { title: "Paid", class: "text-success" },
      2: { title: "Pending", class: "text-warning" },
      3: { title: "Failed", class: "text-danger" },
      4: { title: "Cancelled", class: "text-secondary" },
    };
  if (r) {
    let t = new DataTable(r, {
      ajax: assetsPath + "json/ecommerce-customer-order.json",
      columns: [
        { data: "id" },
        { data: "id", orderable: !1, render: DataTable.render.select() },
        { data: "order" },
        { data: "date" },
        { data: "customer" },
        { data: "payment" },
        { data: "status" },
        { data: "method" },
        { data: "id" },
      ],
      columnDefs: [
        {
          className: "control",
          searchable: !1,
          orderable: !1,
          responsivePriority: 2,
          targets: 0,
          render: function (e, t, s, a) {
            return "";
          },
        },
        {
          targets: 1,
          orderable: !1,
          searchable: !1,
          responsivePriority: 3,
          checkboxes: !0,
          checkboxes: {
            selectAllRender: '<input type="checkbox" class="form-check-input">',
          },
          render: function () {
            return '<input type="checkbox" class="dt-checkboxes form-check-input">';
          },
        },
        {
          targets: 2,
          render: function (e, t, s, a) {
            return (
              '<a href="app-ecommerce-order-details.html"><span>#' +
              s.order +
              "</span></a>"
            );
          },
        },
        {
          targets: 3,
          render: function (e, t, s, a) {
            var n = new Date(s.date),
              s = s.time.substring(0, 5);
            return `<span class="text-nowrap">${n.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}, ${s}</span>`;
          },
        },
        {
          targets: 4,
          responsivePriority: 1,
          render: function (e, t, s, a) {
            var n = s.customer,
              r = s.email,
              s = s.avatar;
            let o;
            return `
              <div class="d-flex justify-content-start align-items-center order-name text-nowrap">
                <div class="avatar-wrapper">
                  <div class="avatar avatar-sm me-3">
                    ${(o = s
                      ? `<img src="${assetsPath}img/avatars/${s}" alt="Avatar" class="rounded-circle">`
                      : `<span class="avatar-initial rounded-circle bg-label-${
                          [
                            "success",
                            "danger",
                            "warning",
                            "info",
                            "dark",
                            "primary",
                            "secondary",
                          ][Math.floor(6 * Math.random())]
                        }">${(n.match(/\b\w/g) || [])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}</span>`)}
                  </div>
                </div>
                <div class="d-flex flex-column">
                  <h6 class="m-0"><a href="pages-profile-user.html" class="text-heading">${n}</a></h6>
                  <small>${r}</small>
                </div>
              </div>`;
          },
        },
        {
          targets: 5,
          render: function (e, t, s, a) {
            (s = s.payment), (s = l[s]);
            return s
              ? `
                <h6 class="mb-0 align-items-center d-flex w-px-100 ${s.class}">
                  <i class="icon-base bx bxs-circle icon-8px me-1"></i>${s.title}
                </h6>`
              : e;
          },
        },
        {
          targets: -3,
          render: function (e, t, s, a) {
            (s = s.status), (s = o[s]);
            return s
              ? `
                <span class="badge px-2 ${s.class} text-capitalized">
                  ${s.title}
                </span>`
              : e;
          },
        },
        {
          targets: -2,
          render: function (e, t, s, a) {
            var n = s.method;
            let r = "paypal" === n ? "@gmail.com" : s.method_number;
            return `
              <div class="d-flex align-items-center text-nowrap">
                <img src="${assetsPath}img/icons/payments/${n}.png" alt="${n}" width="29">
                <span><i class="icon-base bx bx-dots-horizontal-rounded mt-1"></i>${r}</span>
              </div>`;
          },
        },
        {
          targets: -1,
          title: "Actions",
          searchable: !1,
          orderable: !1,
          render: function (e, t, s, a) {
            return `
              <div class="d-flex justify-content-sm-start align-items-sm-center">
                <button class="btn btn-icon dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                  <i class="icon-base bx bx-dots-vertical-rounded icon-md"></i>
                </button>
                <div class="dropdown-menu dropdown-menu-end m-0">
                  <a href="app-ecommerce-order-details.html" class="dropdown-item">View</a>
                  <a href="javascript:void(0);" class="dropdown-item delete-record">Delete</a>
                </div>
              </div>`;
          },
        },
      ],
      select: { style: "multi", selector: "td:nth-child(2)" },
      order: [3, "asc"],
      layout: {
        topStart: { search: { placeholder: "Search Order", text: "_INPUT_" } },
        topEnd: {
          rowClass: "row ms-3 my-0 justify-content-between",
          features: [
            { pageLength: { menu: [7, 10, 25, 50, 100], text: "_MENU_" } },
            {
              buttons: [
                {
                  extend: "collection",
                  className: "btn btn-label-primary dropdown-toggle",
                  text: '<span class="d-flex align-items-center gap-2"><i class="icon-base bx bx-export icon-sm"></i> <span class="d-none d-sm-inline-block">Export</span></span>',
                  buttons: [
                    {
                      extend: "print",
                      text: '<span class="d-flex align-items-center"><i class="icon-base bx bx-printer me-1"></i>Print</span>',
                      className: "dropdown-item",
                      exportOptions: {
                        columns: [3, 4, 5, 6, 7],
                        format: {
                          body: function (e, t, s) {
                            if (e.length <= 0) return e;
                            e = new DOMParser().parseFromString(e, "text/html")
                              .body.childNodes;
                            let a = "";
                            return (
                              e.forEach((e) => {
                                e.classList && e.classList.contains("user-name")
                                  ? (a += e.lastChild.firstChild.textContent)
                                  : (a += e.textContent || e.innerText || "");
                              }),
                              a
                            );
                          },
                        },
                      },
                      customize: function (e) {
                        (e.document.body.style.color = n),
                          (e.document.body.style.borderColor = s),
                          (e.document.body.style.backgroundColor = a);
                        e = e.document.body.querySelector("table");
                        e.classList.add("compact"),
                          (e.style.color = "inherit"),
                          (e.style.borderColor = "inherit"),
                          (e.style.backgroundColor = "inherit");
                      },
                    },
                    {
                      extend: "csv",
                      text: '<span class="d-flex align-items-center"><i class="icon-base bx bx-file me-1"></i>Csv</span>',
                      className: "dropdown-item",
                      exportOptions: {
                        columns: [3, 4, 5, 6, 7],
                        format: {
                          body: function (e, t, s) {
                            if (e.length <= 0) return e;
                            e = new DOMParser().parseFromString(e, "text/html")
                              .body.childNodes;
                            let a = "";
                            return (
                              e.forEach((e) => {
                                e.classList && e.classList.contains("user-name")
                                  ? (a += e.lastChild.firstChild.textContent)
                                  : (a += e.textContent || e.innerText || "");
                              }),
                              a
                            );
                          },
                        },
                      },
                    },
                    {
                      extend: "excel",
                      text: '<span class="d-flex align-items-center"><i class="icon-base bx bxs-file-export me-1"></i>Excel</span>',
                      className: "dropdown-item",
                      exportOptions: {
                        columns: [3, 4, 5, 6, 7],
                        format: {
                          body: function (e, t, s) {
                            if (e.length <= 0) return e;
                            e = new DOMParser().parseFromString(e, "text/html")
                              .body.childNodes;
                            let a = "";
                            return (
                              e.forEach((e) => {
                                e.classList && e.classList.contains("user-name")
                                  ? (a += e.lastChild.firstChild.textContent)
                                  : (a += e.textContent || e.innerText || "");
                              }),
                              a
                            );
                          },
                        },
                      },
                    },
                    {
                      extend: "pdf",
                      text: '<span class="d-flex align-items-center"><i class="icon-base bx bxs-file-pdf me-1"></i>Pdf</span>',
                      className: "dropdown-item",
                      exportOptions: {
                        columns: [3, 4, 5, 6, 7],
                        format: {
                          body: function (e, t, s) {
                            if (e.length <= 0) return e;
                            e = new DOMParser().parseFromString(e, "text/html")
                              .body.childNodes;
                            let a = "";
                            return (
                              e.forEach((e) => {
                                e.classList && e.classList.contains("user-name")
                                  ? (a += e.lastChild.firstChild.textContent)
                                  : (a += e.textContent || e.innerText || "");
                              }),
                              a
                            );
                          },
                        },
                      },
                    },
                    {
                      extend: "copy",
                      text: '<i class="icon-base bx bx-copy me-1"></i>Copy',
                      className: "dropdown-item",
                      exportOptions: {
                        columns: [3, 4, 5, 6, 7],
                        format: {
                          body: function (e, t, s) {
                            if (e.length <= 0) return e;
                            e = new DOMParser().parseFromString(e, "text/html")
                              .body.childNodes;
                            let a = "";
                            return (
                              e.forEach((e) => {
                                e.classList && e.classList.contains("user-name")
                                  ? (a += e.lastChild.firstChild.textContent)
                                  : (a += e.textContent || e.innerText || "");
                              }),
                              a
                            );
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            },
          ],
        },
        bottomStart: {
          rowClass: "row mx-3 justify-content-between",
          features: ["info"],
        },
        bottomEnd: { paging: { firstLast: !1 } },
      },
      language: {
        paginate: {
          next: '<i class="icon-base bx bx-chevron-right scaleX-n1-rtl icon-18px"></i>',
          previous:
            '<i class="icon-base bx bx-chevron-left scaleX-n1-rtl icon-18px"></i>',
        },
      },
      responsive: {
        details: {
          display: DataTable.Responsive.display.modal({
            header: function (e) {
              return "Details of " + e.data().customer;
            },
          }),
          type: "column",
          renderer: function (e, t, s) {
            var a,
              n,
              r,
              s = s
                .map(function (e) {
                  return "" !== e.title
                    ? `<tr data-dt-row="${e.rowIndex}" data-dt-column="${e.columnIndex}">
                      <td>${e.title}:</td>
                      <td>${e.data}</td>
                    </tr>`
                    : "";
                })
                .join("");
            return (
              !!s &&
              ((a = document.createElement("div")).classList.add(
                "table-responsive"
              ),
              (n = document.createElement("table")),
              a.appendChild(n),
              n.classList.add("table"),
              ((r = document.createElement("tbody")).innerHTML = s),
              n.appendChild(r),
              a)
            );
          },
        },
      },
    });
    document.addEventListener("click", function (e) {
      e.target.classList.contains("delete-record") &&
        (t.row(e.target.closest("tr")).remove().draw(),
        (e = document.querySelector(".dtr-bs-modal"))) &&
        e.classList.contains("show") &&
        bootstrap.Modal.getInstance(e)?.hide();
    });
  }
  setTimeout(() => {
    [
      {
        selector: ".dt-buttons .btn",
        classToRemove: "btn-secondary",
        classToAdd: "btn-label-secondary",
      },
      {
        selector: ".dt-search .form-control",
        classToRemove: "form-control-sm",
        classToAdd: "ms-0",
      },
      { selector: ".dt-length .form-select", classToRemove: "form-select-sm" },
      { selector: ".dt-length", classToAdd: "mt-md-6 mt-0" },
      { selector: ".dt-layout-table", classToRemove: "row mt-2" },
      { selector: ".dt-layout-end", classToAdd: "px-3 mt-0" },
      {
        selector: ".dt-layout-end .dt-buttons",
        classToAdd: "gap-2 px-3 mt-0 mb-md-0 mb-6",
      },
      {
        selector: ".dt-layout-end .dt-buttons .btn-group",
        classToAdd: "mx-auto",
      },
      { selector: ".dt-layout-start", classToAdd: "px-3 mt-0" },
      {
        selector: ".dt-layout-full",
        classToRemove: "col-md col-12",
        classToAdd: "table-responsive",
      },
    ].forEach(({ selector: e, classToRemove: s, classToAdd: a }) => {
      document.querySelectorAll(e).forEach((t) => {
        s && s.split(" ").forEach((e) => t.classList.remove(e)),
          a && a.split(" ").forEach((e) => t.classList.add(e));
      });
    });
  }, 100);
});
