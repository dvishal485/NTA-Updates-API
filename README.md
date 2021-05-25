# JEE Updates API
JEE Updates API written in javascript to fetch latest data from [JEE Mains Website](https://jeemain.nta.nic.in/webinfo2021)

![Guide for API Links](assets/guide.jpg)

# Usage

## Current Events
  - This usually contains the current ongoing events
  - API Link :
`https://jee-updates-api.dvishal485.workers.dev/events`
  - Response Example :

```
{
  "total_result": 1,
  "result": [
    {
      "name": " PUBLIC NOTICE: Postponement of the Joint Entrance Examination (Main) 2021 for the May Session (Session 4) - Reg. ",
      "new": true,
      "url": "https://jeemain.nta.nic.in/webinfo2021/File/GetFile?FileId=41&amp;LangId=P"
    }
  ]
}
```

## Latest Updates
  - This usually includes the Admit Card and Result related content
  - API Link :
`https://jee-updates-api.dvishal485.workers.dev/status`
  - Response Example :
```
{
  "total_result": 1,
  "result": [
    {
      "name": " JEE(Main) February & March 2021 Session Result ",
      "new": true,
      "url": "https://ntaresults.nic.in/resultservices/JEEMain-Feb-2021-auth"
    }
  ]
}
```

## News & Events
  - This usually includes the current events and news
  - API Link :
`https://jee-updates-api.dvishal485.workers.dev/news`
  - Response Example :
```
{
  "total_result": 1,
  "result": [
    {
      "name": " PUBLIC NOTICE: Postponement of the Joint Entrance Examination (Main) 2021 for the May Session (Session 4) - Reg. ",
      "new": true,
      "url": "https://jeemain.nta.nic.in/webinfo2021/File/GetFile?FileId=41&amp;LangId=P"
    }
  ]
}
```

### Note
  - The API is hosted with Cloudflare Worker and have a limit to its maximum ussage, do not misuse the API.
  - To check if the link is working properly, one may fetch the [link](https://jee-updates-api.dvishal485.workers.dev/) `https://jee-updates-api.dvishal485.workers.dev/` and look for the 'alive' status

### Acknowledgement
A special thanks to [@cyberboysumanjay's Repo](https://github.com/cyberboysumanjay/amazon-scraper) which inspired me for the project