import Styles from './unifi.module.css';
import { ISPChart } from './client-chart';

import { unifi } from "../../../../services/unifi";

export async function UnifiNetwork() {
	const data = await unifi.isp_stats();

	return (
		<div className={Styles['chart-container']}>
			<ISPChart
				data={data}
			/>
		</div>
	);
}
