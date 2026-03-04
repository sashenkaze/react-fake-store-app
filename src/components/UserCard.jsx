import { Card } from "flowbite-react";

export default function UserCard({ user }) {
    return (
        <Card className="max-w-sm mx-auto mt-10">
            <div className="flex flex-col items-center pb-10 mt-8">
                <img
                    src={user.avatar}
                    alt={user.name}
                    className="mb-3 w-30 h-30 rounded-full shadow-lg object-cover"
                />

                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                    {user.name}
                </h5>

                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                </span>

                <div className="mt-4 flex space-x-3 lg:mt-6">
                    <button className="inline-flex items-center rounded-lg bg-cyan-700 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-800">
                        Change Profile
                    </button>

                    <button className="inline-flex items-center rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                        Logout
                    </button>
                </div>
            </div>
        </Card>
    );
}
