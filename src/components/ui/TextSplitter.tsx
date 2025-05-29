import { ReactNode } from 'react';

interface TextSplitterProps {
    text: string;
    wordDisplayStyle?: 'block' | 'inline';
    className?: string;
}

export function TextSplitter({
    text,
    wordDisplayStyle = 'inline',
    className = ''
}: TextSplitterProps): ReactNode {
    const words = text.split(' ');

    return (
        <>
            {words.map((word, wordIndex) => (
                <span
                    key={wordIndex}
                    className={`${className} ${wordDisplayStyle === 'block' ? 'block' : 'inline-block'}`}
                    style={{ display: wordDisplayStyle === 'block' ? 'block' : 'inline-block' }}
                >
                    {word.split('').map((char, charIndex) => (
                        <span
                            key={charIndex}
                            className="split-char inline-block"
                        >
                            {char}
                        </span>
                    ))}
                    {wordIndex < words.length - 1 && wordDisplayStyle === 'inline' && (
                        <span className="split-char inline-block">&nbsp;</span>
                    )}
                </span>
            ))}
        </>
    );
}