import { Card } from "flowbite-react";

export default function CardComp() {
    return (
        <Card
            className="max-w-sm"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="https://i.pinimg.com/736x/7e/12/c7/7e12c76a6f8208d7f3d86de28797c609.jpg"
        >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                SHAW
            </h5>
        </Card>
    )
}