[<< Back](./../design.md)

# Sequence Diagrams - Gaming Marketplace Platform

Below we elaborate on the system's sequence diagrams showing the interaction flows for the gaming marketplace platform use cases.

We follow the iDesign principles as highlighted in the [design.md](./../design.md) file in this repository.

## User Registration and Authentication Flow

### User Registration with KYC Verification

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant UM as UserManager
    participant UE as UserEngine
    participant FE as FraudEngine
    participant KE as KYCEngine
    participant SS as SEONService
    participant UD as UserDataManager
    participant DB as Database
    
    U->>F: Submit registration form
    F->>UM: RegisterUserAsync(request)
    
    UM->>UE: ValidateRegistrationRequest(request)
    UE-->>UM: ValidationResult
    
    alt Validation Failed
        UM-->>F: ValidationFailed(errors)
        F-->>U: Show validation errors
    else Validation Passed
        UM->>FE: CheckRegistrationFraudAsync(request)
        FE->>SS: CheckUserAsync(fraudRequest)
        SS-->>FE: FraudCheckResult
        FE-->>UM: FraudResult
        
        alt Fraud Detected
            UM-->>F: FraudDetected(reason)
            F-->>U: Show fraud message
        else Clean User
            UM->>UE: CreateUser(request)
            UE-->>UM: User
            
            UM->>UD: SaveUserAsync(user)
            UD->>DB: INSERT INTO Users
            DB-->>UD: Success
            UD-->>UM: Success
            
            alt KYC Required
                UM->>KE: InitiateKYCProcessAsync(userId, documents)
                KE->>SS: VerifyDocumentAsync(document)
                SS-->>KE: KYCVerificationResult
                KE->>UD: SaveKYCVerificationAsync(verification)
                UD->>DB: INSERT INTO KYCVerifications
                DB-->>UD: Success
                UD-->>KE: Success
                KE-->>UM: KYCInitiated
            end
            
            UM-->>F: RegistrationSuccess(user)
            F-->>U: Show success message
        end
    end
```

### User Login Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant UM as UserManager
    participant UE as UserEngine
    participant UD as UserDataManager
    participant DB as Database
    
    U->>F: Submit login credentials
    F->>UM: AuthenticateUserAsync(loginRequest)
    
    UM->>UD: GetUserByEmailAsync(email)
    UD->>DB: SELECT FROM Users WHERE email
    DB-->>UD: User data
    UD-->>UM: User
    
    alt User Not Found
        UM-->>F: AuthenticationFailed(InvalidCredentials)
        F-->>U: Show error message
    else User Found
        UM->>UE: AuthenticateCredentials(email, password, hashedPassword)
        UE-->>UM: AuthenticationResult
        
        alt Authentication Failed
            UM-->>F: AuthenticationFailed(InvalidCredentials)
            F-->>U: Show error message
        else Authentication Success
            UM->>UD: UpdateUserAsync(user) // Update last login
            UD->>DB: UPDATE Users SET last_login_at
            DB-->>UD: Success
            UD-->>UM: Success
            
            UM-->>F: AuthenticationSuccess(user, token)
            F-->>U: Redirect to dashboard
        end
    end
```

## Marketplace Service Purchase Flow

### Service Purchase with Payment Processing

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant MM as MarketplaceManager
    participant ME as MarketplaceEngine
    participant PE as PaymentEngine
    participant PS as PaymentService
    participant MD as MarketplaceDataManager
    participant DB as Database
    
    U->>F: Select service and click purchase
    F->>MM: PurchaseServiceAsync(userId, serviceId, purchaseRequest)
    
    MM->>ME: ValidatePurchaseEligibility(userId, serviceId)
    ME->>MD: GetServiceByIdAsync(serviceId)
    MD->>DB: SELECT FROM MarketplaceServices
    DB-->>MD: Service data
    MD-->>ME: MarketplaceService
    
    ME->>MD: GetUserPurchasesAsync(userId)
    MD->>DB: SELECT FROM Purchases WHERE user_id
    DB-->>MD: User purchases
    MD-->>ME: Purchase[]
    
    ME-->>MM: PurchaseEligibility
    
    alt Not Eligible
        MM-->>F: NotEligible(reason)
        F-->>U: Show eligibility error
    else Eligible
        MM->>PE: ProcessPaymentAsync(paymentDetails)
        
        PE->>PS: ProcessPaymentAsync(paymentRequest)
        PS-->>PE: PaymentResult
        
        alt Payment Failed
            PE-->>MM: PaymentFailed(error)
            MM-->>F: PaymentFailed(error)
            F-->>U: Show payment error
        else Payment Success
            PE-->>MM: PaymentSuccess(transactionId)
            
            MM->>ME: CreatePurchase(userId, serviceId, request)
            ME-->>MM: Purchase
            
            MM->>MD: SavePurchaseAsync(purchase)
            MD->>DB: INSERT INTO Purchases
            DB-->>MD: Success
            MD-->>MM: Success
            
            MM-->>F: PurchaseSuccess(purchase)
            F-->>U: Show purchase confirmation
            
            Note over F,U: User gains access to purchased service
        end
    end
```

## Tournament Participation Flow

### Tournament Registration and Participation

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant TM as TournamentManager
    participant TD as TournamentDataManager
    participant GM as GamingManager
    participant GE as GamingEngine
    participant GD as GamingDataManager
    participant DB as Database
    
    U->>F: View tournaments page
    F->>TM: GetActiveTournamentsAsync()
    TM->>TD: GetActiveTournamentsAsync()
    TD->>DB: SELECT FROM Tournaments WHERE status = 'Registration'
    DB-->>TD: Tournament data
    TD-->>TM: Tournament[]
    TM-->>F: Active tournaments
    F-->>U: Display tournaments
    
    U->>F: Click join tournament
    F->>TM: RegisterForTournamentAsync(userId, tournamentId)
    
    TM->>TD: GetTournamentByIdAsync(tournamentId)
    TD->>DB: SELECT FROM Tournaments WHERE id
    DB-->>TD: Tournament
    TD-->>TM: Tournament
    
    alt Tournament Full or Closed
        TM-->>F: RegistrationFailed(reason)
        F-->>U: Show error message
    else Registration Open
        TM->>TD: SaveTournamentParticipationAsync(participation)
        TD->>DB: INSERT INTO TournamentParticipations
        DB-->>TD: Success
        TD-->>TM: Success
        
        TM-->>F: RegistrationSuccess(tournament)
        F-->>U: Show registration confirmation
        
        Note over U,F: Tournament starts
        
        U->>F: Start tournament game
        F->>GM: StartGameSessionAsync(userId, gameType)
        
        GM->>GE: CreateGameSession(userId, gameType)
        GE-->>GM: GameSession
        
        GM->>GD: SaveGameSessionAsync(gameSession)
        GD->>DB: INSERT INTO GameSessions
        DB-->>GD: Success
        GD-->>GM: Success
        
        GM-->>F: GameSessionStarted(session)
        F-->>U: Launch game
        
        Note over U,F: User plays game
        
        U->>F: Submit game score
        F->>GM: EndGameSessionAsync(sessionId, score)
        
        GM->>GE: ProcessGameEnd(sessionId, score)
        GE-->>GM: GameSessionResult
        
        GM->>GD: SaveGameSessionAsync(updatedSession)
        GD->>DB: UPDATE GameSessions SET score, end_time
        DB-->>GD: Success
        GD-->>GM: Success
        
        GM-->>F: GameSessionEnded(result)
        F-->>U: Show game result
        
        Note over TM,DB: Tournament completes and rankings calculated
    end
```

## Random Prize Distribution Flow

### Prize Claiming Process

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant PM as PrizeManager
    participant GE as GamingEngine
    participant PD as PrizeDataManager
    participant UD as UserDataManager
    participant DB as Database
    
    U->>F: Navigate to prizes section
    F->>PM: GetAvailablePrizesAsync()
    PM->>PD: GetAvailablePrizesAsync()
    PD->>DB: SELECT FROM Prizes WHERE is_available = true
    DB-->>PD: Available prizes
    PD-->>PM: Prize[]
    PM-->>F: Available prizes
    F-->>U: Display prize opportunities
    
    U->>F: Click claim random prize
    F->>PM: ClaimRandomPrizeAsync(userId)
    
    PM->>GE: DeterminePrizeEligibility(userId)
    GE->>UD: GetUserByIdAsync(userId)
    UD->>DB: SELECT FROM Users WHERE id
    DB-->>UD: User
    UD-->>GE: User
    
    GE->>PD: GetUserPrizeClaimsAsync(userId)
    PD->>DB: SELECT FROM PrizeClaims WHERE user_id
    DB-->>PD: User prize claims
    PD-->>GE: PrizeClaim[]
    
    GE-->>PM: PrizeEligibility
    
    alt Not Eligible
        PM-->>F: NotEligible(reason)
        F-->>U: Show eligibility message
    else Eligible
        PM->>PD: GetAvailablePrizesAsync()
        PD->>DB: SELECT FROM Prizes WHERE is_available = true
        DB-->>PD: Available prizes
        PD-->>PM: Prize[]
        
        PM->>GE: SelectRandomPrize(availablePrizes)
        GE-->>PM: Selected prize
        
        PM->>PD: SavePrizeClaimAsync(prizeClaim)
        PD->>DB: UPDATE Prizes SET claimed_by, claimed_at WHERE id
        DB-->>PD: Success
        
        PD->>DB: INSERT INTO PrizeClaims
        DB-->>PD: Success
        PD-->>PM: Success
        
        PM-->>F: PrizeClaimSuccess(prize)
        F-->>U: Show prize won notification
    end
```

## Virtual Pit Boss Assistance Flow

### AI-Powered Gaming Assistance

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant VM as VirtualPitBossManager
    participant VE as VirtualPitBossEngine
    participant GM as GamingManager
    participant GD as GamingDataManager
    participant VD as VirtualPitBossDataManager
    participant AI as AIService
    participant DB as Database
    
    Note over U,F: User is playing a game
    
    U->>F: Request assistance during game
    F->>VM: StartAssistanceSessionAsync(userId, gameSessionId)
    
    VM->>GD: GetGameSessionByIdAsync(gameSessionId)
    GD->>DB: SELECT FROM GameSessions WHERE id
    DB-->>GD: GameSession
    GD-->>VM: GameSession
    
    VM->>VE: CreateAssistanceSession(userId, gameSession)
    VE-->>VM: VirtualPitBossSession
    
    VM->>VD: SaveAssistanceSessionAsync(session)
    VD->>DB: INSERT INTO VirtualPitBossessions
    DB-->>VD: Success
    VD-->>VM: Success
    
    VM-->>F: AssistanceSessionStarted(sessionId)
    F-->>U: Show assistance interface
    
    loop User asks questions
        U->>F: Ask question
        F->>VM: GetAssistanceAsync(sessionId, query)
        
        VM->>VE: GenerateAssistance(query, gameContext)
        VE->>AI: ProcessNaturalLanguageQuery(query, context)
        AI-->>VE: AI response
        
        VE->>VE: UpdateConversationContext(session, query)
        VE-->>VM: AssistanceResponse
        
        VM->>VD: UpdateAssistanceSessionAsync(session)
        VD->>DB: UPDATE VirtualPitBossessions SET messages
        DB-->>VD: Success
        VD-->>VM: Success
        
        VM-->>F: AssistanceResponse(answer)
        F-->>U: Display AI assistance
    end
    
    U->>F: End assistance session
    F->>VM: EndAssistanceSessionAsync(sessionId)
    
    VM->>VD: UpdateAssistanceSessionAsync(session)
    VD->>DB: UPDATE VirtualPitBossessions SET is_active = false, ended_at
    DB-->>VD: Success
    VD-->>VM: Success
    
    VM-->>F: AssistanceSessionEnded()
    F-->>U: Hide assistance interface
```

## Jackpot Games Flow

### Progressive Jackpot Participation

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant GM as GamingManager
    participant GE as GamingEngine
    participant GD as GamingDataManager
    participant DB as Database
    
    U->>F: Navigate to jackpot games
    F->>GM: GetActiveJackpotGamesAsync()
    GM->>GD: GetActiveJackpotGamesAsync()
    GD->>DB: SELECT FROM JackpotGames WHERE is_active = true
    DB-->>GD: Active jackpot games
    GD-->>GM: JackpotGame[]
    GM-->>F: Active jackpot games
    F-->>U: Display jackpot games with current amounts
    
    U->>F: Select jackpot game and place bet
    F->>GM: ContributeToJackpotAsync(gameId, betAmount)
    
    GM->>GD: GetJackpotGameByIdAsync(gameId)
    GD->>DB: SELECT FROM JackpotGames WHERE id
    DB-->>GD: JackpotGame
    GD-->>GM: JackpotGame
    
    GM->>GE: CalculateJackpotContribution(betAmount, currentJackpot)
    GE-->>GM: JackpotCalculationResult
    
    alt Jackpot Triggered
        GM->>GE: ProcessJackpotWin(userId, gameId, jackpotAmount)
        GE-->>GM: JackpotWinResult
        
        GM->>GD: UpdateJackpotGameAsync(updatedGame)
        GD->>DB: UPDATE JackpotGames SET current_jackpot = minimum, last_winner, last_win_date
        DB-->>GD: Success
        GD-->>GM: Success
        
        GM->>GD: SaveJackpotWinAsync(jackpotWin)
        GD->>DB: INSERT INTO JackpotWins
        DB-->>GD: Success
        GD-->>GM: Success
        
        GM-->>F: JackpotWon(winResult)
        F-->>U: Display jackpot win celebration
        
        Note over F,U: Notify all users of jackpot win
        
    else Normal Contribution
        GM->>GD: UpdateJackpotGameAsync(updatedGame)
        GD->>DB: UPDATE JackpotGames SET current_jackpot = current_jackpot + contribution
        DB-->>GD: Success
        GD-->>GM: Success
        
        GM-->>F: ContributionSuccess(newJackpotAmount)
        F-->>U: Update jackpot display
    end
```

## Featured Carousel Management Flow

### Dynamic Featured Content Selection

```mermaid
sequenceDiagram
    participant A as Admin
    participant F as Frontend
    participant MM as MarketplaceManager
    participant ME as MarketplaceEngine
    participant MD as MarketplaceDataManager
    participant DB as Database
    
    Note over A,F: Admin wants to update featured items
    
    A->>F: Access admin panel
    F->>MM: GetServicesAsync(filter)
    MM->>MD: GetServicesAsync(filter)
    MD->>DB: SELECT FROM MarketplaceServices
    DB-->>MD: All services
    MD-->>MM: MarketplaceService[]
    MM-->>F: Available services
    F-->>A: Display services with featured status
    
    A->>F: Toggle featured status for services
    F->>MM: UpdateServiceFeaturedStatusAsync(serviceId, isFeatured)
    
    MM->>MD: GetServiceByIdAsync(serviceId)
    MD->>DB: SELECT FROM MarketplaceServices WHERE id
    DB-->>MD: Service
    MD-->>MM: MarketplaceService
    
    MM->>ME: ValidateFeaturedSelection(allFeaturedServices)
    
    alt Too Many Featured (>4)
        ME-->>MM: ValidationFailed(TooManyFeatured)
        MM-->>F: ValidationError(message)
        F-->>A: Show error message
    else Valid Selection
        MM->>MD: UpdateServiceAsync(updatedService)
        MD->>DB: UPDATE MarketplaceServices SET is_featured
        DB-->>MD: Success
        MD-->>MM: Success
        
        MM-->>F: UpdateSuccess()
        F-->>A: Show success message
        
        Note over F: Frontend carousel automatically updates
        
        F->>MM: GetFeaturedServicesAsync(maxItems: 4)
        MM->>ME: DetermineFeaturedServices(allServices, 4)
        ME->>MD: GetFeaturedServicesAsync(4)
        MD->>DB: SELECT FROM MarketplaceServices WHERE is_featured = true LIMIT 4
        DB-->>MD: Featured services
        MD-->>ME: MarketplaceService[]
        ME-->>MM: Ordered featured services
        MM-->>F: Featured services
        F-->>A: Update carousel display
    end
```

## Error Handling and Failure Recovery

### System Error Handling Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant M as Manager
    participant E as Engine
    participant D as DataManager
    participant DB as Database
    participant L as Logger
    participant N as NotificationService
    
    U->>F: Perform action
    F->>M: ProcessActionAsync(request)
    
    M->>E: ProcessBusinessLogic(request)
    E->>D: AccessData(query)
    
    D->>DB: Execute query
    
    alt Database Error
        DB-->>D: Database exception
        D->>L: LogError(exception, context)
        L-->>D: Logged
        D-->>M: DatabaseError(exception)
        
        M->>L: LogError(exception, userContext)
        L-->>M: Logged
        
        alt Critical Error
            M->>N: NotifyAdministrators(criticalError)
            N-->>M: Notification sent
        end
        
        M-->>F: OperationFailed(userFriendlyMessage)
        F-->>U: Show error message with retry option
        
    else Business Logic Error
        E-->>M: BusinessRuleViolation(details)
        M->>L: LogWarning(violation, context)
        L-->>M: Logged
        M-->>F: ValidationFailed(userMessage)
        F-->>U: Show validation message
        
    else Success
        DB-->>D: Query result
        D-->>E: Data
        E-->>M: ProcessedResult
        M-->>F: OperationSuccess(result)
        F-->>U: Show success feedback
    end
```

## Performance and Scalability Considerations

### Caching Strategy Flow

```mermaid
sequenceDiagram
    participant U as User
    participant F as Frontend
    participant M as Manager
    participant C as CacheService
    participant D as DataManager
    participant DB as Database
    
    U->>F: Request marketplace services
    F->>M: GetServicesAsync(filter)
    
    M->>C: GetCachedServices(cacheKey)
    
    alt Cache Hit
        C-->>M: Cached services
        M-->>F: Services (from cache)
        F-->>U: Display services (fast response)
        
    else Cache Miss
        C-->>M: Cache miss
        M->>D: GetServicesAsync(filter)
        D->>DB: SELECT FROM MarketplaceServices
        DB-->>D: Services data
        D-->>M: MarketplaceService[]
        
        M->>C: SetCachedServices(cacheKey, services, ttl)
        C-->>M: Cached
        
        M-->>F: Services (from database)
        F-->>U: Display services
    end
    
    Note over M,C: Cache invalidation on service updates
    
    alt Service Updated
        M->>C: InvalidateCache(servicesCacheKey)
        C-->>M: Cache cleared
    end
```

[<< Back](./../design.md)
