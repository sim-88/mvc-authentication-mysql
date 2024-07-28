document.addEventListener('DOMContentLoaded', function () {
    var assigneesControl = document.getElementById('assignees-control');

    document.getElementById('taskAssignment').addEventListener('change', function () {
        var selectedValue = this.value.toLowerCase();
        assigneesControl.querySelector('.col-lg-10').innerHTML = ''; // Clear previous content

        if (selectedValue.startsWith('project')) {
            // Show dropdown to choose from team or add new assignee button
            var select = document.createElement('select');
            select.className = 'form-control mb-3';
            select.name = 'team_member';
            select.innerHTML = '<option value="">Choose from team</option>';
            var teamMembers = getTeamMembers(selectedValue);
            teamMembers.forEach(function (member) {
                var option = document.createElement('option');
                option.value = member.email;
                option.textContent = member.name;
                select.appendChild(option);
            });
            assigneesControl.querySelector('.col-lg-10').appendChild(select);

            var addAssigneeButton = document.createElement('button');
            addAssigneeButton.type = 'button';
            addAssigneeButton.className = 'btn btn-primary mt-2 me-2';
            addAssigneeButton.innerHTML = '<i class="bx bxs-user-plus"></i> Add New Assignee';
            addAssigneeButton.addEventListener('click', function () {
                addNewAssigneeInput();
            });
            assigneesControl.querySelector('.col-lg-10').appendChild(addAssigneeButton);
        } else if (selectedValue === 'standalone') {
            // Show multiple new assignee inputs
            addNewAssigneeInput(); // Initial input

            var addAssigneeButton = document.createElement('button');
            addAssigneeButton.type = 'button';
            addAssigneeButton.className = 'btn btn-primary mt-2 me-2';
            addAssigneeButton.innerHTML = '<i class="bx bxs-user-plus"></i> Add New Assignee';
            addAssigneeButton.addEventListener('click', function () {
                addNewAssigneeInput();
            });
            assigneesControl.querySelector('.col-lg-10').appendChild(addAssigneeButton);
        }
    });

    // Function to add a new input field for new assignees
    function addNewAssigneeInput() {
        var inputGroup = document.createElement('div');
        inputGroup.className = 'input-group mb-2';

        var input = document.createElement('input');
        input.type = 'email';
        input.className = 'form-control rounded-start';
        input.name = 'new_assignees[]'; // Use array notation for multiple values
        input.placeholder = 'Enter email';
        input.required = true;
        inputGroup.appendChild(input);

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn btn-outline-secondary rounded-end';
        button.innerHTML = '<i class="bx bxs-user-minus"></i>';
        button.addEventListener('click', function () {
            inputGroup.parentNode.removeChild(inputGroup); // Remove the input group
        });
        inputGroup.appendChild(button);

        assigneesControl.querySelector('.col-lg-10').appendChild(inputGroup);
    }

    // Example function to get team members based on the selected project
    function getTeamMembers(project) {
        var teamMembers = {
            'project1': [
                { id: 'member1', name: 'Member 1', email: 'member1@example.com' },
                { id: 'member2', name: 'Member 2', email: 'member2@example.com' }
            ],
            'project2': [
                { id: 'member3', name: 'Member 3', email: 'member3@example.com' },
                { id: 'member4', name: 'Member 4', email: 'member4@example.com' }
            ]
        };

        return teamMembers[project] || [];
    }

    const form = document.querySelector('.custom-validation');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const formData = new FormData(form);

        fetch('/create-task', {
            method: 'POST',
            body: formData,
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert(`Task created successfully with ID: ${data.taskId}`);
                form.reset(); // Clear the form
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while creating the task.');
        });
    });
    
});
