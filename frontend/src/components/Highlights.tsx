/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, useRef } from "react";
import * as apiClient from "../api-client";
import { Link } from "react-router-dom";

const Highlights: React.FC = () => {
    const [highlights, setHighlights] = useState<any[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchHighlights();
    }, []);

    const fetchHighlights = async () => {
        try {
            const data = await apiClient.getAllHighlights();
            setHighlights(data);
        } catch (error) {
            console.error("Failed to fetch highlights:", error);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    if (!highlights) {
        return <></>;
    }

    return (
        <div className="relative mb-12">
            <div className="flex justify-between">
                <h1 className="font-bold text-3xl sticky top-0 poppins-semibold mb-4">Highlights</h1>
                <div className="flex gap-1">
                    <button
                        onClick={() => scroll("left")}
                        className="border border-black h-10 w-10 text-center hover:text-white hover:bg-black "
                    >
                        {"<"}
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="border border-black h-10 w-10 text-center hover:text-white hover:bg-black "
                    >
                        {">"}
                    </button>
                </div>
            </div>
            <div className="flex flex-nowrap gap-3 overflow-x-scroll pb-3" ref={scrollRef}>
                {highlights.map((highlight) => {
                    const shortenedContent = highlight.content.length > 60 ? `${highlight.content.substring(0, 60)}...` : highlight.content;

                    return (
                        <div key={highlight._id} className="flex flex-col justify-between bg-gray-200 rounded-md p-4 w-full lg:w-1/4" style={{ flex: "0 0 auto" }}>
                            <div>
                            <img src={highlight.imageUrl} alt={highlight.title} className="w-full h-40 rounded-md object-cover mb-4" />
                            <h2 className="font-semibold text-xl mb-2">{highlight.title}</h2>
                            <p className="text-gray-700 mb-4">{shortenedContent}</p>
                            </div>
                            <div>
                            <Link to={`/highlights/${highlight._id}`} className=" text-black px-3 py-1.5 hover:text-white hover:bg-slate-300 border border-black hover:underline">Read More</Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Highlights;
