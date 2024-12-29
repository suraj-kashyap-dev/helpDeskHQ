```sql
CREATE TABLE organizations (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    domain VARCHAR(100) UNIQUE,
    subscription_type VARCHAR(50),
    settings JSONB DEFAULT '{}',
    business_hours JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Department Management
CREATE TABLE departments (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT REFERENCES organizations(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    manager_id BIGINT,
    parent_department_id BIGINT REFERENCES departments(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User Management
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT REFERENCES organizations(id),
    department_id BIGINT REFERENCES departments(id),
    email VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255),
    phone VARCHAR(20),
    status user_status_enum DEFAULT 'active',
    employee_id VARCHAR(50),
    job_title VARCHAR(100),
    preferences JSONB DEFAULT '{}',
    notification_settings JSONB DEFAULT '{}',
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_roles (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    role_name VARCHAR(50) NOT NULL,
    permissions JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_skills (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    skill_name VARCHAR(100) NOT NULL,
    proficiency_level INTEGER CHECK (proficiency_level BETWEEN 1 AND 5),
    verified_by BIGINT REFERENCES users(id),
    verified_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Customer Management
CREATE TABLE companies (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT REFERENCES organizations(id),
    name VARCHAR(200) NOT NULL,
    industry VARCHAR(100),
    size_range VARCHAR(50),
    billing_address JSONB,
    shipping_address JSONB,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contacts (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT REFERENCES companies(id),
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    position VARCHAR(100),
    is_primary BOOLEAN DEFAULT false,
    contact_preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE portal_users (
    id BIGSERIAL PRIMARY KEY,
    contact_id BIGINT REFERENCES contacts(id),
    username VARCHAR(50) UNIQUE,
    password_hash VARCHAR(255),
    last_login TIMESTAMP WITH TIME ZONE,
    status portal_user_status_enum DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE contracts (
    id BIGSERIAL PRIMARY KEY,
    company_id BIGINT REFERENCES companies(id),
    contract_number VARCHAR(50) UNIQUE,
    start_date DATE NOT NULL,
    end_date DATE,
    terms TEXT,
    value DECIMAL(15,2),
    status contract_status_enum DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Workspace Management
CREATE TABLE workspaces (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT REFERENCES organizations(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Team Management
CREATE TABLE teams (
    id BIGSERIAL PRIMARY KEY,
    workspace_id BIGINT REFERENCES workspaces(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    lead_user_id BIGINT REFERENCES users(id),
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE team_members (
    team_id BIGINT REFERENCES teams(id),
    user_id BIGINT REFERENCES users(id),
    role team_role_enum DEFAULT 'member',
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (team_id, user_id)
);

-- Project Management
CREATE TABLE projects (
    id BIGSERIAL PRIMARY KEY,
    workspace_id BIGINT REFERENCES workspaces(id),
    name VARCHAR(200) NOT NULL,
    description TEXT,
    manager_id BIGINT REFERENCES users(id),
    status project_status_enum DEFAULT 'active',
    priority project_priority_enum DEFAULT 'medium',
    start_date DATE,
    end_date DATE,
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE milestones (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES projects(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    due_date DATE,
    status milestone_status_enum DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Ticket Management
CREATE TABLE tickets (
    id BIGSERIAL PRIMARY KEY,
    project_id BIGINT REFERENCES projects(id),
    reporter_id BIGINT REFERENCES users(id),
    assignee_id BIGINT REFERENCES users(id),
    company_id BIGINT REFERENCES companies(id),
    contact_id BIGINT REFERENCES contacts(id),
    title VARCHAR(200) NOT NULL,
    description TEXT,
    type ticket_type_enum NOT NULL,
    priority ticket_priority_enum DEFAULT 'medium',
    status ticket_status_enum DEFAULT 'new',
    impact ticket_impact_enum DEFAULT 'low',
    estimated_hours DECIMAL(7,2),
    custom_fields JSONB DEFAULT '{}',
    parent_ticket_id BIGINT REFERENCES tickets(id),
    position INTEGER,
    due_date TIMESTAMP WITH TIME ZONE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id BIGSERIAL PRIMARY KEY,
    ticket_id BIGINT REFERENCES tickets(id),
    user_id BIGINT REFERENCES users(id),
    content TEXT NOT NULL,
    is_internal BOOLEAN DEFAULT false,
    is_resolution BOOLEAN DEFAULT false,
    mentioned_users JSONB DEFAULT '[]',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attachments (
    id BIGSERIAL PRIMARY KEY,
    ticket_id BIGINT REFERENCES tickets(id),
    comment_id BIGINT REFERENCES comments(id),
    user_id BIGINT REFERENCES users(id),
    filename VARCHAR(255) NOT NULL,
    file_type VARCHAR(50),
    file_size BIGINT,
    storage_path VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge Base
CREATE TABLE knowledge_base (
    id BIGSERIAL PRIMARY KEY,
    workspace_id BIGINT REFERENCES workspaces(id),
    author_id BIGINT REFERENCES users(id),
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    status kb_status_enum DEFAULT 'draft',
    category VARCHAR(100),
    tags TEXT[],
    metadata JSONB DEFAULT '{}',
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- SLA Management
CREATE TABLE sla_policies (
    id BIGSERIAL PRIMARY KEY,
    organization_id BIGINT REFERENCES organizations(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    conditions JSONB NOT NULL,
    response_time INTERVAL,
    resolution_time INTERVAL,
    business_hours BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE ticket_sla (
    ticket_id BIGINT REFERENCES tickets(id),
    sla_policy_id BIGINT REFERENCES sla_policies(id),
    first_response_due TIMESTAMP WITH TIME ZONE,
    resolution_due TIMESTAMP WITH TIME ZONE,
    status sla_status_enum DEFAULT 'active',
    breached_at TIMESTAMP WITH TIME ZONE,
    PRIMARY KEY (ticket_id, sla_policy_id)
);

-- Automation
CREATE TABLE automations (
    id BIGSERIAL PRIMARY KEY,
    workspace_id BIGINT REFERENCES workspaces(id),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    trigger_conditions JSONB NOT NULL,
    actions JSONB NOT NULL,
    is_active BOOLEAN DEFAULT true,
    execution_order INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create necessary ENUM types
CREATE TYPE user_status_enum AS ENUM ('active', 'inactive', 'pending', 'suspended');
CREATE TYPE portal_user_status_enum AS ENUM ('active', 'inactive', 'pending');
CREATE TYPE contract_status_enum AS ENUM ('draft', 'active', 'expired', 'terminated');
CREATE TYPE project_status_enum AS ENUM ('planning', 'active', 'on_hold', 'completed', 'archived');
CREATE TYPE project_priority_enum AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE milestone_status_enum AS ENUM ('pending', 'in_progress', 'completed', 'delayed');
CREATE TYPE ticket_type_enum AS ENUM ('incident', 'problem', 'change_request', 'service_request');
CREATE TYPE ticket_priority_enum AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE ticket_status_enum AS ENUM ('new', 'open', 'in_progress', 'on_hold', 'resolved', 'closed');
CREATE TYPE ticket_impact_enum AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE team_role_enum AS ENUM ('member', 'lead', 'admin');
CREATE TYPE kb_status_enum AS ENUM ('draft', 'review', 'published', 'archived');
CREATE TYPE sla_status_enum AS ENUM ('active', 'paused', 'breached', 'completed');
```