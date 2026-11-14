import { faqs } from '../../data/faqs';
import Panel from '../ui/Panel';
import styles from './Faqs.module.css';

export default function Faqs() {
	return (
		<Panel heading="Questions">
			<dl className={styles.list}>
				{faqs.map((faq) => (
					<div key={faq.question} data-reveal>
						<dt className={styles.question}>{faq.question}</dt>
						{faq.answer.map((paragraph) => (
							<dd className={styles.answer} key={paragraph}>
								{paragraph}
							</dd>
						))}
					</div>
				))}
			</dl>
		</Panel>
	);
}
