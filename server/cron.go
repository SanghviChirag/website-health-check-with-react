package main

import (
	"fmt"
	"strconv"

	"gopkg.in/robfig/cron.v2"
)

func setCron(website Website) int {
	c := cron.New()

	interval := strconv.Itoa(website.CheckInterval / 60)
	cronInterval := "@every " + interval + "m"
	fmt.Println("cronInterval")
	fmt.Println(cronInterval)
	c.AddFunc(cronInterval, func() { checkLink(website) })
	c.Start()
	return 1
}
