package main

import (
	"strconv"

	"gopkg.in/robfig/cron.v2"
)

func setCron(website Website) int {
	c := cron.New()
	interval := strconv.Itoa(website.CheckInterval)
	c.AddFunc("*/"+interval+" * * * * *", func() { checkLink(website) })
	c.Start()
	return 1
}
