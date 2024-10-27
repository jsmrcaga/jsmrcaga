sudo apt-get install ca-certificates
sudo apt-get install -y open-iscsi nfs-common cryptsetup
sudo systemctl enable iscsid
sudo systemctl start iscsid
sudo modprobe iscsi_tcp

# curl -sSfL https://raw.githubusercontent.com/longhorn/longhorn/v1.7.2/scripts/environment_check.sh | bash
