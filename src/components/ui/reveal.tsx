import { component$, useSignal, useVisibleTask$, Slot } from '@builder.io/qwik';

interface RevealProps {
    delay?: number; // in ms
    direction?: 'up' | 'left' | 'right';
    class?: string;
}

export const Reveal = component$<RevealProps>(({ delay = 0, direction = 'up', class: className = '' }) => {
    const ref = useSignal<HTMLElement>();
    const isVisible = useSignal(false);

    // eslint-disable-next-line qwik/no-use-visible-task
    useVisibleTask$(({ cleanup }) => {
        if (!ref.value) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isVisible.value = true;
                        observer.disconnect(); // Animate only once
                    }
                });
            },
            {
                threshold: 0.1, // Trigger when 10% of element is visible
                rootMargin: '0px 0px -50px 0px', // Offset slightly so it triggers a bit after entering
            }
        );

        observer.observe(ref.value);

        cleanup(() => observer.disconnect());
    });

    // Calculate transform based on direction
    const getTransform = () => {
        if (isVisible.value) return 'translate(0, 0)';

        switch (direction) {
            case 'left': return 'translateX(-2rem)'; // Start from left
            case 'right': return 'translateX(2rem)'; // Start from right
            default: return 'translateY(3rem)'; // Start from below (up)
        }
    };

    return (
        <div
            ref={ref}
            class={`${className}`}
            style={{
                opacity: isVisible.value ? 1 : 0,
                transform: getTransform(),
                transition: `all 1000ms cubic-bezier(0.17, 0.55, 0.55, 1) ${delay}ms`,
            }}
        >
            <Slot />
        </div>
    );
});
