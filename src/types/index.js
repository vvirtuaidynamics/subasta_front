export function Module(payload) {
  return {
    name: payload.name,
    model: payload.model || '',
    class: payload.class || '',
    label: payload.label,
    title: payload.title || '',
    url: payload.url || '',
    icon: payload.icon || '',
    order: payload.order || 0,
    parent: payload.parent || '',
    fields: JSON.parse(payload.fields) || [],
    permissions: payload.permissions || [],
  }
}

export function User(payload) {
  return {
    id: payload.id || null,
    uuid: payload.uuid || null,
    name: payload.name,
    surname: payload.surname,
    username: payload.username,
    email: payload.email || null,
    emailVerifiedAt: payload.email_verified_at || null,
    avatar: payload.avatar || null,
    active: payload.active || false,
    superAdmin: payload.superAdmin || false,
    fullName: payload.full_name || `${payload.name} ${payload.surname}`,
    lastLoginAt: payload.last_login_at || null,
    createdAt: payload.created_at || null,
    updatedAt: payload.updated_at || null,
    roleNames: payload.role_names || [],
    permissionNames: payload.permissions || [],
    modules: payload.modules || [],
    token: payload.token || null,
  }
}

