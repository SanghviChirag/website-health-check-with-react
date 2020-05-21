package main

import (
	"strconv"

	"gopkg.in/robfig/cron.v2"
)

func setCron(website Website) int {
	c := cron.New()
	maxSec := 60
	maxMin := 60 * 60
	maxHours := 60 * 60 * 24
	maxDays := 60 * 60 * 24 * 31

	cronInterval := "* * * * * *"

	interval := strconv.Itoa(website.CheckInterval)
	if website.CheckInterval <= maxSec {
		cronInterval = "*/" + interval + " * * * * *"
	} else if website.CheckInterval <= maxMin {
		interval = strconv.Itoa(website.CheckInterval / maxSec)
		cronInterval = "* */" + interval + " * * * *"
	} else if website.CheckInterval <= maxHours {
		interval = strconv.Itoa(website.CheckInterval / maxMin)
		cronInterval = "* * */" + interval + " * * *"
	} else if website.CheckInterval <= maxDays {
		interval = strconv.Itoa(website.CheckInterval / maxHours)
		cronInterval = "0 0 0 */" + interval + " * *"
	} else {
		interval = strconv.Itoa(website.CheckInterval / maxDays)
		cronInterval = "0 0 0 1 */" + interval + " *"
	}

	c.AddFunc(cronInterval, func() { checkLink(website) })
	c.Start()
	return 1
}
