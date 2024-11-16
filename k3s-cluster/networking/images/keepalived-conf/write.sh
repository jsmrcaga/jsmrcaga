#!/bin/bash

set -e

if [[ -z "$NODE_IP" ]];
then
	echo "NODE_IP must be defined"
	exit 1
fi

if [[ -z "$CHECK_SCRIPT" ]];
then
	echo "CHECK_SCRIPT must be defined"
	exit 1
fi

if [[ -z "$PASSWORD" ]];
then
	echo "PASSWORD must be defined"
	exit 1
fi

if [[ -z "$VIRTUAL_IP" ]];
then
	echo "VIRTUAL_IP must be defined"
	exit 1
fi

if [[ -z "$ROUTER_ID" ]];
then
	echo "ROUTER_ID must be defined"
	exit 1
fi

if [[ -z "$VRRP_INSTANCE_NAME" ]];
then
	echo "VRRP_INSTANCE_NAME must be defined"
	exit 1
fi

export INTERFACE=$(ip -o addr show | grep $NODE_IP | awk -F: '{print $2}' | awk '{print $1}' | sed s/^[[:space:]]*//)

if [[ -z "$INTERFACE" ]];
then
	echo "Could not find interface for $NODE_IP"
	echo "IP output"
	echo $(ip addr show)
	echo "GREP"
	echo $(ip addr show | grep $NODE_IP -B3)
	echo "HEAD"
	echo $(ip addr show | grep $NODE_IP -B3 | head -1)
	echo "AWK"
	echo $(ip addr show | grep $NODE_IP -B3 | head -1 | awk -F: '{print $2}')
	exit 1
fi

export PRIORITY=$(echo $NODE_IP | cut -d. -f4)

envsubst < keepalived_template.conf > $DESTINATION
echo "Done"
