import React from 'react';

export function KubernetesNode({ name, ip }) {
	return (
		<div>
			{name} {ip}
		</div>
	);
}
