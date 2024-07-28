
$(document).ready(function () {
    // Function to fetch projects from API
    function fetchProjects(callback) {
        fetch('/api/projects')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched projects:', data); // Log fetched data
                callback(null, data);
            })
            .catch(error => {
                console.error('Error fetching projects:', error);
                callback(error, null);
            });
    }

    // Function to delete a project
    function deleteProject(projectId, callback) {
        fetch(`/api/projects/${projectId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Deleted project:', data); // Log deletion
                callback(null, data);
            })
            .catch(error => {
                console.error('Error deleting project:', error);
                callback(error, null);
            });
    }
    // Function to fetch a single project's details
    function fetchProjectDetails(projectId, callback) {
        fetch(`/api/projects/${projectId}`)
            .then(response => response.json())
            .then(data => {
                console.log('Fetched project details:', data); // Log project details
                callback(null, data);
            })
            .catch(error => {
                console.error('Error fetching project details:', error);
                callback(error, null);
            });
    }

    // Function to update a project
    function updateProject(projectId, projectData, callback) {
        fetch(`/api/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(projectData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Updated project:', data); // Log update
                callback(null, data);
            })
            .catch(error => {
                console.error('Error updating project:', error);
                callback(error, null);
            });
    }
    // Function to initialize DataTable with fetched projects
    function initializeDataTable(projects) {
        const table = $('#project-list').DataTable({
            data: projects,
            bLengthChange: false,
            language: {
                oPaginate: {
                    sNext: '<i class="mdi mdi-chevron-right"></i>',
                    sPrevious: '<i class="mdi mdi-chevron-left"></i>'
                }
            },
            order: [[0, 'desc']], // Order by the first column (project_id)
            columns: [
                {
                    data: 'project_id',
                    render: function (data, type, row) {
                        return '<div class="d-none">' + row.project_id + '</div><div class="avatar-sm bg-light rounded p-2"><img src="' + (row.projectLogoImg || '') + '" alt="" class="img-fluid rounded-circle"></div>';
                    }
                },
                {
                    data: null,
                    render: function (data, type, row) {
                        return '<div><h5 class="text-truncate font-size-14"><a href="javascript:void(0);" class="text-dark">' + row.name + '</a></h5><p class="text-muted mb-0">' + row.description + '</p></div>';
                    }
                },
                {
                    data: 'due_date',
                    render: function (data, type, row) {
                        if (row.due_date) {
                            return moment(row.due_date).format('YYYY-MM-DD'); // Format date using moment.js
                        } else {
                            return 'No due date';
                        }
                    }
                },
                {
                    data: 'status',
                    render: function (data, type, row) {
                        switch (row.status) {
                            case 'Completed':
                                return '<span class="badge bg-success">Completed</span>';
                            case 'In Progress':
                                return '<span class="badge bg-primary">In Progress</span>';
                            case 'Not Started':
                                return '<span class="badge bg-secondary">Not Started</span>';
                            case 'On Hold':
                                return '<span class="badge bg-warning text-dark">On Hold</span>';
                            default:
                                return '<span class="badge bg-secondary">Not Started</span>';
                        }
                    }
                },
                {
                    data: 'team_name',
                    render: function (data, type, row) {
                        return row.team_name ? row.team_name : 'No Team Assigned';
                    }
                },
                {
                    data: null,
                    sortable: false,
                    render: function (data, type, row) {
                        return `
                            <div class="d-flex gap-3">
                                <a href="#newOrderModal" data-bs-toggle="modal" class="text-success edit-list" data-edit-id="${row.project_id}">
                                    <i class="mdi mdi-pencil font-size-24"></i>
                                </a>
                                <a href="javascript:void(0);" class="text-danger remove-list" data-remove-id="${row.project_id}" data-bs-toggle="modal" data-bs-target="#removeItemModal">
                                    <i class="mdi mdi-delete font-size-24"></i>
                                </a>
                            </div>`;
                    }
                }
            ],
            drawCallback: function (settings) {
                
                // Attach event listener for delete buttons
                $('.remove-list').off('click').on('click', function () {
                    const projectId = $(this).data('remove-id')
                    console.log('Project ID to be removed:', projectId); // Log project ID
                    $('#remove-item').data('remove-id', projectId); // Pass project ID to the modal button
                });
                // Attach event listener for edit buttons
                $('.edit-list').off('click').on('click', function () {
                    const projectId = $(this).data('edit-id');
                    console.log('Project ID to be edited:', projectId); // Log project ID

                    fetchProjectDetails(projectId, (error, project) => {
                        if (!error) {
                            $('#edit-project-id').val(project.project_id);
                            $('#edit-project-name').val(project.name);
                            $('#edit-project-description').val(project.description);
                            $('#edit-project-due-date').val(moment(project.due_date).format('YYYY-MM-DD'));
                            $('#edit-project-status').val(project.status);
                            $('#edit-project-team').val(project.team_id); // Assuming team_id is available in the project data
                            $('#editProjectModal').modal('show');
                        } else {
                            console.error('Error fetching project details:', error);
                        }
                    });
                });
            }
        });

        // Search table
        $("#searchTableList").keyup(function () {
            table.search($(this).val()).draw();
        });

        // Add classes to table elements
        $(".dataTables_length select").addClass("form-select form-select-sm");
        $(".dataTables_paginate").addClass("pagination-rounded");
        $(".dataTables_filter").hide();
    }

    // Fetch projects and initialize the table
    fetchProjects((error, projects) => {
        if (error) {
            console.error('Error fetching projects:', error);
        } else {
            console.log('Data to be loaded into DataTable:', projects);
            initializeDataTable(projects);
        }
    });

    // Handle the deletion in modal
    $('#removeItemModal').on('show.bs.modal', function (event) {
        const button = $(event.relatedTarget); // Button that triggered the modal
        const projectId = button.data('remove-id'); // Extract project ID from data-* attributes
        console.log('Deleting project ID:', projectId); // Log the project ID being deleted
        

        $('#remove-item').off('click').on('click', function () {
            alert("Deleting Project")
            deleteProject(projectId, (error, data) => {
                if (!error) {
                    // Find the row with the project ID and remove it from the table
                    const table = $('#project-list').DataTable();
                    const row = table.rows().nodes().to$().filter((index, row) => $(row).find('td').first().text() === String(projectId));
                    table.row(row).remove().draw();
                    $('#removeItemModal').modal('hide'); // Close the modal
                } else {
                    console.log(error)
                }
            });
        });
    });

    // Handle the updating in modal
    $('#edit-project-form').on('submit', function (event) {
        event.preventDefault();
        const projectId = $('#edit-project-id').val();
        const projectData = {
            name: $('#edit-project-name').val(),
            description: $('#edit-project-description').val(),
            due_date: $('#edit-project-due-date').val(),
            status: $('#edit-project-status').val(),
            team_id: $('#edit-project-team').val()
        };
        
        updateProject(projectId, projectData, (error, data) => {
            if (!error) {
                const table = $('#project-list').DataTable();
                const row = table.rows().nodes().to$().filter((index, row) => $(row).find('td').first().text() === String(projectId));
                const rowData = table.row(row).data();
                rowData.name = projectData.name;
                rowData.description = projectData.description;
                rowData.due_date = projectData.due_date;
                rowData.status = projectData.status;
                rowData.team_name = $('#edit-project-team option:selected').text(); // Assuming you have a dropdown for team names
                table.row(row).data(rowData).draw();
                $('#editProjectModal').modal('hide'); // Close the modal
            } else {
                console.log(error);
            }
        });
    });

});

