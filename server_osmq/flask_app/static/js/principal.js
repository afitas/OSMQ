<body class="hold-transition sidebar-mini layout-fixed">
    
    <div class="wrapper">

        <!-- Navbar -->
        <nav class="main-header navbar navbar-expand navbar-white navbar-light">
            <!-- Left navbar links -->
            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <!-- Messages Dropdown Menu -->
                <li class="nav-item dropdown">
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">

                    </div>
                </li>
            </ul>
        </nav>
        <!-- /.navbar -->

        <!-- Main Sidebar Container -->
        <aside class="main-sidebar sidebar-dark-primary elevation-4">
            <!-- Brand Logo -->
            <!-- <img src="/static/img/OSM.png" width="80px" height="80px" alt=""> -->
            <!-- Sidebar -->
            <div class="sidebar">
                <!-- Sidebar user panel (optional) -->

                <!-- Sidebar Menu -->
                <nav class="mt-2">
                    <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu"
                        data-accordion="false">
                        <!-- Add icons to the links using the .nav-icon class
               with font-awesome or any other icon font library -->
                    <!-- Altair -->
                    <li class="nav-item has-treeview menu-open">
                        <a href="#" class="nav-link ">
                            <i class="nav-icon fas fa-th"></i>
                            <p>
                                Chart For OSMQ
                                <i class="right fas fa-angle-left"></i>
                            </p>
                        </a>
                        <ul class="nav nav-treeview">
                            <li class="nav-item">
                                <a href="" class="nav-link ">
                                   
                                    <p>Evaluation de la qualité de donée OSM</p>
                                </a>
                            </li>
                           
                        </ul>
                    </li> 
                        <form>
                            <div>
                            <a href="" class="nav-link ">
                                <i class="nav-icon fas fa-th"></i>
                                <p>
                                    Choisir une ville
                                    <i class="right fas fa-angle-left"></i>
                                </p>
                            </a>
                            </div>
                            <select class="form-control form-control-sm">
                                <option>Oran</option>
                                <!-- <option>Alger</option> -->
                            </select>
                            <button onclick="showChart();" type="button" class="btn btn-primary">Executer l'évaluation</button>
                        </form>
                    </ul>
                </nav>
                <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>

                <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Content Header (Page header) -->
            {% block my_content %}
            {% endblock my_content %}
            <!-- /.content-header -->
            <!-- Main content -->
            <div class="content">
                <div>
                    <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                          <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Indic 1</a>
                        </li>
                        <li class="nav-item" role="presentation">
                          <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Indic 2</a>
                        </li>
                        <li class="nav-item" role="presentation">
                          <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Indic 3</a>
                        </li>
                      </ul>
                      <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab"><div>
                            <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Points</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Lignes</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Polygones</a>
                                </li>
                              </ul>
                              <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">Points</div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Lignes</div>
                                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Polygones</div>
                            </div>
                        </div></div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><div>
                            <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Points</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Lignes</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Polygones</a>
                                </li>
                              </ul>
                              <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">Points</div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Lignes</div>
                                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Polygones</div>
                            </div>
                        </div></div>
                        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab"><div>
                            <ul class="nav nav-tabs justify-content-center" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Points</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Lignes</a>
                                </li>
                                <li class="nav-item" role="presentation">
                                  <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab" aria-controls="contact" aria-selected="false">Polygones</a>
                                </li>
                              </ul>
                              <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">Points</div>
                                <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Lignes</div>
                                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">Polygones</div>
                            </div>
                        </div></div>
                    </div>
                </div>
                      
                        <canvas id="line_actuality" width="800" height="450"  style="display: none;"></canvas>
                        <canvas id="point_actuality" width="800" height="450"  style="display: none;"></canvas>
                        <canvas id="polygon_actuality" width="800" height="450"  style="display: none;"></canvas>
                        <canvas id="Completude" width="800" height="450"  style="display: none;"></canvas>
                        <canvas id="distinct" width="800" height="450"  style="display: none;"></canvas>
                        <canvas id="calass" width="800" height="450"  style="display: none;"></canvas>
                        <canvas id="crea_edit_point" width="800" height="450" style="display: none;"></canvas>
                        <canvas id="crea_edit_line" width="800" height="450" style="display: none;"></canvas>
                        <canvas id="crea_edit_poly" width="800" height="450" style="display: none;"></canvas>
                        <canvas id="poly" width="800" height="450" style="display: none;"></canvas>
                    
              
            </div>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->

        <!-- Control Sidebar -->
        <!-- /.control-sidebar -->

        <!-- Main Footer -->
        <footer class="main-footer">
            <!-- To the right -->
            <div class="float-right d-none d-sm-inline">
            </div>
            <!-- Default to the left -->
        </footer>
    </div>
    <!-- ./wrapper -->
   
    
    <script src="/static/js/Chart.min.2.7.2.js"></script>
<script src="/static/js/jquery.min.js"></script>
<script src="/static/js/plugin"></script>
<!-- <script src="{{ url_for('static', filename='js/principal.js') }}"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.4/dist/Chart.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@0.7.0"></script> -->

</body>