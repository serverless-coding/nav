"use client";

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents() {
    const [toc, setToc] = useState<TOCItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        // Get all headings and create TOC items
        const headings = Array.from(document.querySelectorAll('h2, h3, h4, h5, h6'))
            .map(heading => ({
                id: heading.id,
                text: heading.textContent || '',
                level: parseInt(heading.tagName.charAt(1)),
            }))
            .filter(heading => heading.id && heading.text); // Only include headings with IDs and text

        setToc(headings);

        // Set up intersection observer for active heading
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0
            }
        );

        // Observe all headings
        headings.forEach(heading => {
            const element = document.getElementById(heading.id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = -100; // Adjust this value based on your header height
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
            setActiveId(id);
        }
    };

    if (toc.length === 0) return null;

    return (
        <nav className="hidden lg:block sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto w-64 pl-4 border-l">
            <h4 className="font-medium mb-4 text-sm text-muted-foreground">目录</h4>
            <ul className="space-y-2 text-sm">
                {toc.map((item, index) => (
                    <li
                        key={index}
                        style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
                        className="line-clamp-2"
                    >
                        <button
                            onClick={() => handleClick(item.id)}
                            className={`hover:text-foreground flex items-center space-x-2 ${activeId === item.id
                                    ? 'text-foreground font-medium'
                                    : 'text-muted-foreground'
                                }`}
                        >
                            {item.level > 1 ? (
                                <ChevronRight className="h-3 w-3 shrink-0" />
                            ) : (
                                <ChevronDown className="h-3 w-3 shrink-0" />
                            )}
                            <span>{item.text}</span>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
}