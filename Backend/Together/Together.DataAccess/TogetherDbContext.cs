    using Microsoft.AspNetCore.Identity;
    using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
    using Microsoft.EntityFrameworkCore;
    using Together.DataAccess.Entities;

    namespace Together.DataAccess
    {
        public class TogetherDbContext : IdentityDbContext<IdentityUser>
        {
            public TogetherDbContext(DbContextOptions<TogetherDbContext> options) : base(options)
            {
            }

            public DbSet<UserInfo> UserInfo { get; set; }
            public DbSet<UserAccountLevel> UserAccountLevels { get; set; }
            public DbSet<UserEquipment> UserEquipments { get; set; }
            public DbSet<Sport> Sports { get; set; }
            public DbSet<UserSport> UserSports { get; set; }
            public DbSet<SportExperience> SportExperience { get; set; }
            public DbSet<UserEvent> UserEvents { get; set; }
            public DbSet<EventStatus> EventStatuses { get; set; }
            public DbSet<UserEventRequest> UserEventRequests { get; set; }
            public DbSet<UserFavoriteEvent> UserFavoriteEvents { get; set; }
            public DbSet<Notification> Notifications { get; set; }
            public DbSet<UserEventLocation> UserEventLocations { get; set; }
            public DbSet<ChatMessage> ChatMessages { get; set; }
            public DbSet<ChatRoom> ChatRooms { get; set; }
            public DbSet<ChatRoomUser> ChatRoomUsers { get; set; }


            protected override void OnModelCreating(ModelBuilder modelBuilder)
            {
                base.OnModelCreating(modelBuilder);

                modelBuilder.Entity<UserInfo>(entity =>
                {
                    entity.HasKey(c => c.UserID);
                    entity.ToTable(name: "UserInfo");
                });

                modelBuilder.Entity<UserAccountLevel>(entity =>
                {
                    entity.HasKey(c => c.UserId);
                    entity.ToTable(name: "UserAccountLevel");
                });

                modelBuilder.Entity<UserEvent>(entity =>
                {
                    entity.HasOne(ue => ue.UserInfo)
                          .WithMany(ui => ui.UserEvents)
                          .HasForeignKey(ue => ue.UserId)
                          .HasPrincipalKey(ui => ui.UserID);
                });

                modelBuilder.Entity<UserFavoriteEvent>(entity =>
                {
                    entity.HasOne(ufe => ufe.UserInfo)
                          .WithMany(ui => ui.UserFavoriteEvents)
                          .HasForeignKey(ufe => ufe.UserId);

                    entity.HasOne(ufe => ufe.UserEvent)
                          .WithMany(ue => ue.UserFavoriteEvents)
                          .HasForeignKey(ufe => ufe.EventId);
                });
                
                modelBuilder.Entity<UserEventRequest>(entity =>
                {
                    entity.HasOne(ue => ue.UserEvent)
                          .WithMany(ue => ue.UserEventRequest)
                          .HasForeignKey(ue => ue.UserEventId);
                    
                    entity.HasOne(ue=> ue.GuestUserInfo)
                          .WithMany(ui => ui.UserEventRequests)
                          .HasForeignKey(ue => ue.GuestUserId)
                          .HasPrincipalKey(ui => ui.UserID);
                });
                
                modelBuilder.Entity<Notification>(entity =>
                {
                    entity.HasKey(c => c.NotificationId);
                    entity.ToTable(name: "Notifications");
                    
                    entity.HasOne(n => n.UserEvent)
                          .WithMany(ue => ue.Notifications)
                          .HasForeignKey(n => n.UserEventId);

                    entity.HasOne(n => n.UserInfo)
                        .WithMany(ui => ui.Notifications)
                        .HasForeignKey(n => n.UserId);
                });
                
                modelBuilder.Entity<UserEventLocation>(entity =>
                {
                    entity.HasKey(c => c.UserEventLocationId);
                    entity.ToTable(name: "UserEventLocations");
                    
                    entity.HasOne(uel => uel.UserEvent)
                          .WithMany(ue => ue.UserEventLocations)
                          .HasForeignKey(uel => uel.UserEventId);
                });
                
                modelBuilder.Entity<ChatMessage>(entity =>
                {
                    entity.HasKey(c => c.ChatMessageId);
                    entity.ToTable(name: "ChatMessages");
                    
                    entity.HasOne(cm => cm.ChatRoom)
                          .WithMany(cr => cr.ChatMessages)
                          .HasForeignKey(cm => cm.ChatRoomId);
                    
                    entity.HasOne(cm => cm.Sender)
                          .WithMany(ui => ui.ChatMessages)
                          .HasForeignKey(cm => cm.SenderId)
                          .HasPrincipalKey(ui => ui.UserID);
                });
                
                modelBuilder.Entity<ChatRoom>(entity =>
                {
                    entity.HasKey(c => c.ChatRoomId);
                    entity.ToTable(name: "ChatRooms");
                    
                    entity.HasMany(cr => cr.ChatMessages)
                          .WithOne(cm => cm.ChatRoom)
                          .HasForeignKey(cm => cm.ChatRoomId);
                    
                    entity.HasMany(cr => cr.ChatRoomUsers)
                          .WithOne(cru => cru.ChatRoom)
                          .HasForeignKey(cru => cru.ChatRoomId);
                    
                    entity.HasOne(cr => cr.UserEvent)
                          .WithMany(ue => ue.ChatRooms)
                          .HasForeignKey(cr => cr.UserEventId);
                });
                
                modelBuilder.Entity<ChatRoomUser>(entity =>
                {
                    entity.HasKey(c => c.ChatRoomUserId);
                    entity.ToTable(name: "ChatRoomUsers");
                    
                    entity.HasOne(cru => cru.ChatRoom)
                          .WithMany(cr => cr.ChatRoomUsers)
                          .HasForeignKey(cru => cru.ChatRoomId);
                    
                    entity.HasOne(cru => cru.UserInfo)
                          .WithMany(ui => ui.ChatRoomUsers)
                          .HasForeignKey(cru => cru.UserId)
                          .HasPrincipalKey(ui => ui.UserID);
                });

            }
        }
    }
