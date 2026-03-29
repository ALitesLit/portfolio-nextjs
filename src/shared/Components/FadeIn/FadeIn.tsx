"use client";
import { useEffect, useRef, useState, ReactNode, FC } from "react";

interface IFadeProps {
  children: ReactNode;
  className?: string;
  threshold?: number; // Порог появления (от 0 до 1)
}

const FadeIn: FC<IFadeProps> = ({ children, className = "", threshold = 0.15 }) => {
    const [isVisible, setVisible] = useState<boolean>(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setVisible(true);
                        // Прекращаем наблюдение после того, как элемент появился
                        if (domRef.current) observer.unobserve(domRef.current);
                    }
                });
            },
            {
                // Элемент считается видимым, когда он зашел в экран на threshold %
                threshold: threshold, 
            }
        );

        if (domRef.current) {
            observer.observe(domRef.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    return (
        <div
            ref={domRef}
            className={`transition-all duration-1000 ease-out will-change-[opacity,transform] ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            } ${className}`}
        >
            {children}
        </div>
    );
};

export default FadeIn;