import Styles from './unifi.module.css';
import { ISPChart } from './client-chart';

import { unifi } from "../../../../services/unifi";

export async function UnifiNetwork() {
	// Magic code to handle CI-time building
	try {
		const data = await unifi.isp_stats();

		return (
			<div className={Styles['chart-container']}>
				<ISPChart
					data={data}
				/>
			</div>
		);
	} catch(error) {
		if(error.code === 'NO_UNIFI_ENDPOINT') {
			return (
				<div className={Styles['chart-container']}>
					{null}
				</div>
			);
		}

		throw error;
	}
}
