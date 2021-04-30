import type { PersonaIdentifier, ProfileIdentifier } from '../../Identifier/type'
import type { IdentifierMap } from '../../Identifier/IdentifierMap'
import type { AESJsonWebKey, EC_Private_JsonWebKey, EC_Public_JsonWebKey } from '../../modules'

export interface LinkedProfileDetails {
    connectionConfirmState: 'confirmed' | 'pending' | 'denied'
}

export interface ProfileRecord {
    identifier: ProfileIdentifier
    nickname?: string
    localKey?: AESJsonWebKey
    linkedPersona?: PersonaIdentifier
    createdAt: Date
    updatedAt: Date
}

export interface PersonaRecord {
    identifier: PersonaIdentifier
    /**
     * If this key is generated by the mnemonic word, this field should be set.
     */
    mnemonic?: {
        words: string
        parameter: { path: string; withPassword: boolean }
    }
    publicKey: EC_Public_JsonWebKey
    privateKey?: EC_Private_JsonWebKey
    localKey?: AESJsonWebKey
    nickname?: string
    linkedProfiles: IdentifierMap<ProfileIdentifier, LinkedProfileDetails>
    createdAt: Date
    updatedAt: Date
    /**
     * create a dummy persona which should hide to the user until
     * connected at least one SNS identity
     */
    uninitialized?: boolean
}
