interface RoleSkill {
    name: string;
    about: string;
}

interface RoleResponsibility {
    title: string;
    about: string;
}

interface JobDescription {
    id: string;
    title: string;
    skills: RoleSkill[];
    about: string;
    category: string;
    responsibilities: RoleResponsibility[];
    yearsOfExperience: number;
}

export type JobRoleId=typeof JOB_ROLES[number]['id'];

export const JOB_ROLES: JobDescription[] = [
    {
        id: 'frontend',
        title: 'Frontend Developer',
        skills: [
            { name: 'React', about: 'React is a JavaScript library for building user interfaces.' },
            { name: 'Next.js', about: 'Next.js is a React framework for building server-rendered and static websites.' },
            { name: 'Tailwind CSS', about: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.' },
        ],

        about: 'A frontend developer is responsible for implementing visual elements that users see and interact with in a web application.',
        category: 'Software Development',
        responsibilities: [
            { title: 'Design and implement user interfaces', about: 'Design and implement user interfaces using HTML, CSS, and JavaScript.' },
            { title: 'Implement responsive design', about: 'Implement responsive design to ensure that the application looks and functions well on different screen sizes.' },
            { title: 'Write clean and efficient code', about: 'Write clean and efficient code that is easy to maintain and scale.' },
        ],

        yearsOfExperience: 2,
    },
    {
        id: 'backend',
        title: 'Backend Developer',
        skills: [
            { name: 'Node.js', about: 'Node.js is a JavaScript runtime environment that allows you to run JavaScript on the server.' },
            { name: 'Express.js', about: 'Express.js is a web framework for Node.js that makes it easier to build web applications.' },
            { name: 'MongoDB', about: 'MongoDB is a NoSQL database that stores data in a flexible, JSON-like format.' },
        ],

        about: 'A backend developer is responsible for implementing the server-side logic of a web application.',
        category: 'Software Development',
        responsibilities: [
            { title: 'Design and implement server-side logic', about: 'Design and implement server-side logic using Node.js, Express.js, and MongoDB.' },
            { title: 'Write clean and efficient code', about: 'Write clean and efficient code that is easy to maintain and scale.' },
            { title: 'Implement authentication and authorization', about: 'Implement authentication and authorization to secure the application.' },
        ],

        yearsOfExperience: 2,
    },
    {
        id: 'fullstack',
        title: 'Fullstack Developer',
        skills: [
            { name: 'React', about: 'React is a JavaScript library for building user interfaces.' },
            { name: 'Next.js', about: 'Next.js is a React framework for building server-rendered and static websites.' },
            { name: 'Tailwind CSS', about: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom designs.' },
            { name: 'Node.js', about: 'Node.js is a JavaScript runtime environment that allows you to run JavaScript on the server.' },
            { name: 'Express.js', about: 'Express.js is a web framework for Node.js that makes it easier to build web applications.' },
            { name: 'MongoDB', about: 'MongoDB is a NoSQL database that stores data in a flexible, JSON-like format.' },
        ],

        about: 'A fullstack developer is responsible for implementing both the frontend and backend logic of a web application.',     category: 'Software Development',
        responsibilities: [
            { title: 'Design and implement user interfaces', about: 'Design and implement user interfaces using React, Next.js, and Tailwind CSS.' },
            { title: 'Design and implement server-side logic', about: 'Design and implement server-side logic using Node.js, Express.js, and MongoDB.' },
            { title: 'Write clean and efficient code', about: 'Write clean and efficient code that is easy to maintain and scale.' },   
        ],

        yearsOfExperience: 2,
    },
    {
        id: 'devops',
        title: 'DevOps Engineer',
        skills: [
            { name: 'Docker', about: 'Docker is a containerization platform that allows you to package and run applications in isolated environments.' },
            { name: 'Kubernetes', about: 'Kubernetes is a platform for automating the deployment, scaling, and management of containerized applications.' },
            { name: 'Jenkins', about: 'Jenkins is an open-source automation server that allows you to automate the build, test, and deployment of software.' }, 
        ],

        about: 'A DevOps engineer is responsible for automating the deployment, scaling, and management of containerized applications.',
        category: 'Software Development',
        responsibilities: [
            { title: 'Design and implement DevOps pipelines', about: 'Design and implement DevOps pipelines using Docker, Kubernetes, and Jenkins.' },
            { title: 'Write clean and efficient code', about: 'Write clean and efficient code that is easy to maintain and scale.' },
            { title: 'Implement continuous integration and delivery', about: 'Implement continuous integration and delivery using Jenkins.' },
        ],

        yearsOfExperience: 2,
    },
    {
        id: 'uiux',
        title: 'UI/UX Designer',
        skills: [
            { name: 'Figma', about: 'Figma is a collaborative design tool that allows you to create and share interactive prototypes for web and mobile apps.' },
            { name: 'Adobe XD', about: 'Adobe XD is a design tool that allows you to create and share interactive prototypes for web and mobile apps.' },
            { name: 'Sketch', about: 'Sketch is a design tool that allows you to create and share interactive prototypes for web and mobile apps.' },
        ],

        about: 'A UI/UX designer is responsible for designing and implementing the user interface and user experience of a web application.',
        category: 'Design',
        responsibilities: [
            { title: 'Design and implement user interfaces', about: 'Design and implement user interfaces using Figma, Adobe XD, and Sketch.' },
            { title: 'Implement responsive design', about: 'Implement responsive design to ensure that the application looks and functions well on different screen sizes.' },
            { title: 'Write clean and efficient code', about: 'Write clean and efficient code that is easy to maintain and scale.' },
        ],

        yearsOfExperience: 2,
    },
    {
        id: 'product',
        title: 'Product Manager',
        skills: [
            { name: 'User research', about: 'User research is the process of understanding user needs and preferences to design and develop products that meet those needs.' },
            { name: 'Product management', about: 'Product management is the process of planning, executing, and monitoring the development of products.' }, 
            { name: 'Agile methodology', about: 'Agile methodology is an iterative approach to product development that focuses on collaboration, customer feedback, and continuous improvement.' },
        ],

        about: 'A product manager is responsible for planning, executing, and monitoring the development of products.',
        category: 'Product Management',
        responsibilities: [
            { title: 'Design and implement product strategies', about: 'Design and implement product strategies using user research, product management, and agile methodology.' },
            { title: 'Write clean and efficient code', about: 'Write clean and efficient code that is easy to maintain and scale.' },
            { title: 'Implement continuous improvement', about: 'Implement continuous improvement using agile methodology.' },
        ],

        yearsOfExperience: 2,
    }
        ]
    

export function getJobRoleById(id: JobRoleId): JobDescription {
    return JOB_ROLES.find((role) => role.id === id) as JobDescription
}

export function getJobByTitle(title: string): JobDescription {
    return JOB_ROLES.find((role) => role.title === title) as JobDescription
}

export function getJobByCategory(category: string): JobDescription[] {
    return JOB_ROLES.filter((role) => role.category === category)
}

export function isValidRole(id: JobRoleId): boolean {
    return JOB_ROLES.some((role) => role.id === id)
}