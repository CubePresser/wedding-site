import Button from '../ui/Button';
import Panel from '../ui/Panel';
import styles from './NotFound.module.css';

export default function NotFound() {
	return (
		<Panel heading="Oops!">
			<div className={`flow ${styles.body}`} data-reveal>
				<p>We couldn't find that page. It may have moved, or the link may have a typo.</p>
				<Button href="/">Back to Home</Button>
			</div>
		</Panel>
	);
}
