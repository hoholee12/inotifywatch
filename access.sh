#!/usr/bin/expect
spawn sftp test@192.168.92.151
expect "password:"
send "test\n"
expect "sftp>"
send "ls -lh /home/test/syncfolder\n"
expect "sftp>"
send "exit\n"
interact
