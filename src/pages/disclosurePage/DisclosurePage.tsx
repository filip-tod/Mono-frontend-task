export const DisclosurePage = () => {
    return (
        <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold mb-6">Disclosure</h1>
            <p className="mb-4">
                This is a test application developed as part of a selection process for Mono Software. The application is built using <strong>Vite</strong> with a <strong>React</strong> template and <strong>TypeScript</strong>, adhering to the guidelines and requirements provided by Mono Software.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Project Overview</h2>
            <p className="mb-4">
                The application represents a car shop where users can perform various operations, including listing, creating, editing, and deleting vehicle makes and models. This project aims to demonstrate my understanding of core frontend development concepts, particularly in the context of React, MobX, and REST API integration.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Technologies Used</h2>
            <ul className="list-disc list-inside mb-4">
                <li><strong>React</strong>: The core framework for building the user interface, enabling the development of reusable components and efficient state management.</li>
                <li><strong>TypeScript</strong>: Ensures type safety and helps catch potential errors during development, leading to more maintainable and robust code.</li>
                <li><strong>MobX</strong>: Used for state management across the application, allowing for a clear separation of concerns and ensuring that state changes are predictable and observable.</li>
                <li><strong>Axios</strong>: This library is used to handle all REST API calls, providing a simple and easy-to-use interface for making HTTP requests.</li>
                <li><strong>Tailwind CSS</strong>: Used for styling the application, offering a utility-first approach to CSS, which simplifies the process of designing responsive and modern user interfaces.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Application Features</h2>
            <ul className="list-disc list-inside mb-4">
                <li><strong>CRUD Functionality</strong>: Users can Create, Read, Update, and Delete vehicle makes and models. These operations are fully implemented on the client side, leveraging REST APIs for data persistence.</li>
                <li><strong>Routing</strong>: The application uses <code>react-router-dom</code> to handle client-side routing, ensuring a smooth user experience with route-based navigation.</li>
                <li><strong>Form Validation</strong>: Forms used for creating and editing vehicle data include validation to ensure data integrity before submission.</li>
                <li><strong>State Management</strong>: The application’s state is managed using MobX stores, which are connected to the corresponding services for data fetching and updates.</li>
                <li><strong>Responsive Design</strong>: The interface is built with responsiveness in mind, ensuring a consistent user experience across various devices and screen sizes.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Structure and Best Practices</h2>
            <p className="mb-4">
                The project adheres to the best practices outlined by Mono Software, including a clean file structure with separate folders for components, pages, stores, services, and utilities. The naming conventions follow the Airbnb style guide, ensuring consistency and readability across the codebase.
            </p>

            <h2 className="text-2xl font-semibold mt-6 mb-4">Conclusion</h2>
            <p>
                This test application showcases my ability to build a full-stack frontend application using modern technologies and best practices. It demonstrates not only my technical skills but also my ability to follow detailed specifications and produce a quality deliverable within a given timeframe. I am confident that this project reflects my capabilities and dedication to contributing positively to the Mono Software team.
            </p>
        </div>
    );
};
