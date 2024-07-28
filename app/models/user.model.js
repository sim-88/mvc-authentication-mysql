const users = [
    {
        _id: '12345',
        name: 'Mandeep Saini',
        email: 'mandeep@example.com',
        password: 'password123',
        role: 'admin',
        isActive: true,
        isLocked: false
    },
    {
        _id: '67890',
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
        isActive: true,
        isLocked: false
    },
    {
        _id: '54321',
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
        isActive: true,
        isLocked: false
    }
];

exports.getUserById = (id) => {
    return users.find(user => user._id === id);
};

exports.getUserByEmail = (email) => {
    return users.find(user => user.email === email);
};

exports.addUser = (user) => {
    users.push(user);
    console.log('User added successfully:', user);
};
