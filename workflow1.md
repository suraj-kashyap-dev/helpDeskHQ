flowchart TD
    subgraph "Organization Layer"
        ORG[Organization]
        SETTINGS[Organization Settings]
        SLA[SLA Policies]
    end

    subgraph "Workspace Layer"
        WS[Workspaces]
        TEAMS[Teams]
        PROJ[Projects]
        AUTO[Automations]
        KB[Knowledge Base]
    end

    subgraph "User Layer"
        USERS[Users]
        ROLES[Team Roles]
        PREFS[User Preferences]
        NOTIF[Notifications]
    end

    subgraph "Ticket Layer"
        TICKET[Tickets]
        STATUS[Status Tracking]
        HISTORY[History]
        COMMENT[Comments]
        ATTACH[Attachments]
        WATCH[Watchers]
        TAGS[Tags]
    end

    ORG --> WS
    ORG --> USERS
    WS --> TEAMS
    WS --> PROJ
    TEAMS --> USERS
    PROJ --> TICKET
    TICKET --> STATUS
    TICKET --> HISTORY
    TICKET --> COMMENT
    TICKET --> ATTACH
    TICKET --> WATCH
    TICKET --> TAGS
    
    SLA --> TICKET
    AUTO --> TICKET
    KB --> TICKET