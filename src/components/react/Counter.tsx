import { useState } from 'react';

interface CounterProps {
	initial?: number;
	label?: string;
}

/**
 * React 아일랜드 예시 컴포넌트.
 * .astro 파일에서 `<Counter client:load />` 처럼 client 디렉티브와 함께 사용해야 상호작용이 동작합니다.
 */
export default function Counter({ initial = 0, label = '플레이 횟수' }: CounterProps) {
	const [count, setCount] = useState(initial);

	return (
		<div className="counter">
			<span>
				{label}: <strong>{count}</strong>
			</span>
			<button type="button" onClick={() => setCount((c) => c + 1)}>
				+1
			</button>
		</div>
	);
}
