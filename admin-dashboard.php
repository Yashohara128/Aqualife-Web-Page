<?php
session_start();

if (!isset($_SESSION['admin_logged']) || $_SESSION['admin_logged'] !== true) {
    header("Location: login.html");
    exit();
}

require_once 'db.php';

// Fetch Data
$requests = $pdo->query("SELECT * FROM filter_requests ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
$reviews = $pdo->query("SELECT * FROM reviews ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
$logins = $pdo->query("SELECT * FROM user_logins ORDER BY login_time DESC")->fetchAll(PDO::FETCH_ASSOC);
$adminList = $pdo->query("SELECT id, username, created_at FROM admins ORDER BY created_at ASC")->fetchAll(PDO::FETCH_ASSOC);

$totalRequests = count($requests);
$totalReviews = count($reviews);
$totalLogins = count($logins);
$totalAdmins = count($adminList);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard - Aqualife Waters</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        body { background-color: #f1f5f9; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; }
        .stat-card { border-radius: 16px; transition: transform 0.2s ease; }
        .stat-card:hover { transform: translateY(-4px); }
        .table-card { border-radius: 16px; overflow: hidden; }
        .slip-thumb { width: 45px; height: 45px; object-fit: cover; border-radius: 8px; cursor: pointer; border: 2px solid #0284c7; }
    </style>
</head>
<body>

    <!-- Admin Navigation Bar -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm py-3">
        <div class="container-fluid px-4">
            <a class="navbar-brand fw-bold fs-4" href="#">
                <i class="fa-solid fa-droplet me-2"></i>Aqualife Waters <span class="badge bg-warning text-dark fs-6 ms-2">Admin Portal</span>
            </a>
            <div class="d-flex gap-2 align-items-center">
                <span class="text-white small fw-bold me-2"><i class="fa-solid fa-user-circle me-1"></i> <?= htmlspecialchars($_SESSION['admin_user']) ?></span>
                <button type="button" class="btn btn-warning btn-sm rounded-pill fw-bold px-3 text-dark shadow-sm" data-bs-toggle="modal" data-bs-target="#addAdminModal">
                    <i class="fa-solid fa-user-plus me-1"></i> Register New Admin
                </button>
                <a href="services.html" class="btn btn-outline-light btn-sm rounded-pill fw-bold px-3">
                    <i class="fa-solid fa-globe me-1"></i> Site
                </a>
                <a href="logout.php" class="btn btn-danger btn-sm rounded-pill fw-bold px-3 shadow-sm">
                    <i class="fa-solid fa-right-from-bracket me-1"></i> Logout
                </a>
            </div>
        </div>
    </nav>

    <div class="container-fluid px-4 py-4">

        <!-- 📊 Stats -->
        <div class="row g-3 mb-4">
            <div class="col-md-3">
                <div class="card stat-card border-0 shadow-sm bg-white p-3 border-start border-4 border-primary">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="text-muted small fw-bold text-uppercase">Filter Orders</span>
                            <h2 class="fw-bold mb-0 text-primary mt-1"><?= $totalRequests ?></h2>
                        </div>
                        <div class="p-3 bg-primary-subtle text-primary rounded-circle"><i class="fa-solid fa-cart-shopping fs-4"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card border-0 shadow-sm bg-white p-3 border-start border-4 border-warning">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="text-muted small fw-bold text-uppercase">Reviews</span>
                            <h2 class="fw-bold mb-0 text-warning mt-1"><?= $totalReviews ?></h2>
                        </div>
                        <div class="p-3 bg-warning-subtle text-warning rounded-circle"><i class="fa-solid fa-comments fs-4"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card border-0 shadow-sm bg-white p-3 border-start border-4 border-info">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="text-muted small fw-bold text-uppercase">User Logins</span>
                            <h2 class="fw-bold mb-0 text-info mt-1"><?= $totalLogins ?></h2>
                        </div>
                        <div class="p-3 bg-info-subtle text-info rounded-circle"><i class="fa-solid fa-users-viewfinder fs-4"></i></div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="card stat-card border-0 shadow-sm bg-white p-3 border-start border-4 border-success">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <span class="text-muted small fw-bold text-uppercase">Registered Admins</span>
                            <h2 class="fw-bold mb-0 text-success mt-1" id="adminCountBadge"><?= $totalAdmins ?></h2>
                        </div>
                        <div class="p-3 bg-success-subtle text-success rounded-circle"><i class="fa-solid fa-user-shield fs-4"></i></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row g-4 mb-4">
            <!-- 📋 Filter Orders Table -->
            <div class="col-lg-8">
                <div class="card table-card border-0 shadow-sm bg-white h-100">
                    <div class="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                        <h5 class="fw-bold mb-0 text-primary"><i class="fa-solid fa-list-check me-2"></i>Customer Filter Requests</h5>
                        <span class="badge bg-primary rounded-pill px-3 py-2"><?= $totalRequests ?> Orders</span>
                    </div>
                    <div class="card-body p-0">
                        <div class="table-responsive">
                            <table class="table table-hover align-middle mb-0">
                                <thead class="table-light">
                                    <tr>
                                        <th class="ps-3">ID</th>
                                        <th>Name</th>
                                        <th>Phone</th>
                                        <th>Product</th>
                                        <th>Slip</th>
                                        <th class="text-end pe-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php if (empty($requests)): ?>
                                        <tr><td colspan="6" class="text-center py-3 text-muted">No requests yet.</td></tr>
                                    <?php else: ?>
                                        <?php foreach ($requests as $req): ?>
                                            <tr id="req-row-<?= $req['id'] ?>">
                                                <td class="ps-3 fw-bold text-muted">#<?= $req['id'] ?></td>
                                                <td class="fw-bold text-dark"><?= htmlspecialchars($req['full_name']) ?></td>
                                                <td><?= htmlspecialchars($req['phone']) ?></td>
                                                <td class="small"><?= htmlspecialchars($req['product_name']) ?></td>
                                                <td>
                                                    <?php if (!empty($req['slip_path']) && file_exists($req['slip_path'])): ?>
                                                        <img src="<?= htmlspecialchars($req['slip_path']) ?>" class="slip-thumb" alt="Slip" onclick="viewSlipModal('<?= htmlspecialchars($req['slip_path']) ?>')">
                                                    <?php else: ?>
                                                        <span class="text-muted small">-</span>
                                                    <?php endif; ?>
                                                </td>
                                                <td class="text-end pe-3">
                                                    <button class="btn btn-sm btn-outline-danger rounded-pill px-3" onclick="deleteRequest(<?= $req['id'] ?>)">Delete</button>
                                                </td>
                                            </tr>
                                        <?php endforeach; ?>
                                    <?php endif; ?>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 🛡️ Registered Admins List (With Delete Option) -->
            <div class="col-lg-4">
                <div class="card table-card border-0 shadow-sm bg-white h-100">
                    <div class="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                        <h5 class="fw-bold mb-0 text-success"><i class="fa-solid fa-users-gear me-2"></i>System Admins</h5>
                        <button class="btn btn-sm btn-outline-success rounded-pill px-2" data-bs-toggle="modal" data-bs-target="#addAdminModal">
                            <i class="fa-solid fa-plus"></i> Add
                        </button>
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush" id="adminListGroup">
                            <?php foreach ($adminList as $adm): ?>
                                <li class="list-group-item d-flex justify-content-between align-items-center py-3" id="admin-row-<?= $adm['id'] ?>">
                                    <div>
                                        <i class="fa-solid fa-shield text-success me-2"></i>
                                        <strong class="text-dark"><?= htmlspecialchars($adm['username']) ?></strong>
                                        <?php if ($adm['username'] === $_SESSION['admin_user']): ?>
                                            <span class="badge bg-primary-subtle text-primary ms-1">You</span>
                                        <?php endif; ?>
                                    </div>
                                    <div class="d-flex align-items-center gap-2">
                                        <span class="badge bg-light text-muted border small"><?= date('M d, Y', strtotime($adm['created_at'])) ?></span>
                                        <?php if ($adm['username'] !== $_SESSION['admin_user']): ?>
                                            <button class="btn btn-sm btn-outline-danger py-0 px-2 rounded-pill" title="Remove Admin" onclick="deleteAdmin(<?= $adm['id'] ?>, '<?= htmlspecialchars($adm['username']) ?>')">
                                                <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                        <?php endif; ?>
                                    </div>
                                </li>
                            <?php endforeach; ?>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <!-- 👥 USER LOGIN ACTIVITY TABLE -->
        <div class="card table-card border-0 shadow-sm bg-white mb-4">
            <div class="card-header bg-white py-3 border-0 d-flex justify-content-between align-items-center">
                <h5 class="fw-bold mb-0 text-info"><i class="fa-solid fa-clock-rotate-left me-2"></i>User Login Activity Logs</h5>
                <span class="badge bg-info text-white rounded-pill px-3 py-2"><?= $totalLogins ?> Logins</span>
            </div>
            <div class="card-body p-0">
                <div class="table-responsive">
                    <table class="table table-hover align-middle mb-0">
                        <thead class="table-light">
                            <tr>
                                <th class="ps-3">Log ID</th>
                                <th>Username / Email Entered</th>
                                <th>Login Date & Time</th>
                                <th class="text-end pe-3">User IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php if (empty($logins)): ?>
                                <tr><td colspan="4" class="text-center py-4 text-muted">No login activities recorded yet.</td></tr>
                            <?php else: ?>
                                <?php foreach ($logins as $log): ?>
                                    <tr>
                                        <td class="ps-3 text-muted fw-bold">#<?= $log['id'] ?></td>
                                        <td class="fw-bold text-primary"><i class="fa-solid fa-user-check me-2"></i><?= htmlspecialchars($log['username_email']) ?></td>
                                        <td class="small text-muted"><?= date('M d, Y - h:i:s A', strtotime($log['login_time'])) ?></td>
                                        <td class="text-end pe-3"><span class="badge bg-secondary-subtle text-secondary border"><?= htmlspecialchars($log['ip_address']) ?></span></td>
                                    </tr>
                                <?php endforeach; ?>
                            <?php endif; ?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    </div>

    <!-- ➕ REGISTER ADMIN MODAL -->
    <div class="modal fade" id="addAdminModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-sm">
            <div class="modal-content border-0 shadow-lg rounded-4 overflow-hidden">
                <div class="modal-header bg-dark text-white border-0 py-3">
                    <h6 class="modal-title fw-bold"><i class="fa-solid fa-user-plus text-warning me-2"></i>Register New Admin</h6>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4 bg-light">
                    <form id="newAdminForm">
                        <div class="mb-3">
                            <label class="form-label small fw-bold text-muted">New Admin Username</label>
                            <input type="text" name="new_admin_user" class="form-control" placeholder="e.g. yasho_admin" required>
                        </div>
                        <div class="mb-3">
                            <label class="form-label small fw-bold text-muted">Password</label>
                            <input type="password" name="new_admin_pass" class="form-control" placeholder="Min 6 characters" minlength="6" required>
                        </div>
                        <div id="newAdminAlert" class="alert alert-danger py-2 small d-none text-center"></div>
                        <button type="submit" class="btn btn-warning text-dark w-100 rounded-pill fw-bold py-2 shadow-sm">
                            <i class="fa-solid fa-check me-1"></i> Create Admin Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- 🖼️ Slip Modal -->
    <div class="modal fade" id="slipModal" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-lg">
            <div class="modal-content border-0 shadow">
                <div class="modal-header border-0 bg-light">
                    <h6 class="modal-title fw-bold text-primary"><i class="fa-solid fa-receipt me-2"></i>Bank Slip Preview</h6>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center p-3">
                    <img src="" id="modalSlipImg" class="img-fluid rounded shadow-sm" style="max-height: 75vh;" alt="Bank Slip">
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
    <script>
        function viewSlipModal(imgSrc) {
            document.getElementById('modalSlipImg').src = imgSrc;
            new bootstrap.Modal(document.getElementById('slipModal')).show();
        }

        function deleteRequest(id) {
            if (!confirm('Delete this request?')) return;
            const formData = new FormData();
            formData.append('id', id);
            fetch('delete_request.php', { method: 'POST', body: formData })
            .then(res => res.json())
            .then(data => { if (data.status === 'success') document.getElementById('req-row-' + id).remove(); });
        }

        // 🗑️ Delete Admin Handler
        function deleteAdmin(id, username) {
            if (!confirm(`Are you sure you want to remove admin "${username}"?`)) return;

            const formData = new FormData();
            formData.append('id', id);

            fetch('delete_admin.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    const row = document.getElementById('admin-row-' + id);
                    if (row) row.remove();
                    alert("Admin removed successfully!");
                } else {
                    alert("Error: " + data.message);
                }
            })
            .catch(err => {
                console.error(err);
                alert("Server error!");
            });
        }

        // ➕ Handle New Admin Registration
        document.getElementById('newAdminForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const alertBox = document.getElementById('newAdminAlert');

            fetch('register_admin.php', {
                method: 'POST',
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if (data.status === 'success') {
                    alert("Admin registered successfully!");
                    location.reload();
                } else {
                    alertBox.textContent = data.message;
                    alertBox.classList.remove('d-none');
                }
            })
            .catch(err => {
                console.error(err);
                alertBox.textContent = "Server error!";
                alertBox.classList.remove('d-none');
            });
        });
    </script>
</body>
</html>