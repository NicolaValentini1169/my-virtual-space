# Initial setup

After having cloned the project from git you must copy the file `deliverone\src\main\resources\application.properties.template` to the file `deliverone\src\main\resources\application.properties` and configure it according to your local system.

The file .properties must not be committed, if there are changes relevant to all the project, the file `application.properties.template` must be changed and commited instead

The same applies for testing properties files, in the folder `deliverone\src\test\resources`

## Generated sources and Intelllij

Deliverone uses JPA generated sources (via the `hibernate-jpamodelgen` plugin). Said sources are created at compile time in the folder `deliverone\target\generated-sources\annotations` but Intellij does not recognize the folder automatically, giving some compilation errors (the compiler will not find `<entitclass>_` classes, for example `Offerta_`).

To solve this it's sufficient to perform a build (maven or directly from Intellij) that will fail, then set the folder `deliverone\target\generated-sources\annotations` as **Generated Sources Root**.

# JPA

## Custom repositories and left joins

By default a `CriteriaQuery` on a table that has linked tables, will generate an inner join between said tables.

I we want to change the join type, we have to explicitly tell the query to do so.
Let's consider as an example the join between **offerta**, **cliente** and **stato_offerta**. We want to filter by a `like` comparison on some fields of the three tables.
If we use the usual Predicates, we can do something like this

```java
CriteriaBuilder cb = entityManager.getCriteriaBuilder();
CriteriaQuery<Offerta> query = cb.createQuery(Offerta.class);
Root<Offerta> offerta = query.from(Offerta.class);

Path<String> numeroOfferta = offerta.get("numeroOfferta");
Path<String> cliente = offerta.get("cliente").get("denominazione");
Path<String> statoOfferta = offerta.get("statoOfferta").get("descrizione");
Path<String> descrizione = offerta.get("descrizione");
Path<String> rifOffertaEsterno = offerta.get("rifOffertaEsterno");
Path<Date> dataCreazione = offerta.get("dataCreazione");

List<Predicate> predicates = new ArrayList<>();
predicates.add(cb.like(cb.lower(numeroOfferta), cb.lower(searchDescr)));
predicates.add(cb.like(cb.lower(cliente), cb.lower(searchDescr)));
predicates.add(cb.like(cb.lower(statoOfferta), cb.lower(searchDescr)));
predicates.add(cb.like(cb.lower(descrizione), cb.lower(searchDescr)));
predicates.add(cb.like(cb.lower(rifOffertaEsterno), cb.lower(searchDescr)));
```

Then proceed to generate the query. This will generate an inner join between offerta, cliente and stato_offerta.

To change the join type, we change the code like this:

```java
CriteriaBuilder cb = entityManager.getCriteriaBuilder();
CriteriaQuery<Offerta> query = cb.createQuery(Offerta.class);
Root<Offerta> offerta = query.from(Offerta.class);
Join<Object, Object> joinCliente =  offerta.join(Offerta_.CLIENTE, JoinType.LEFT);
Join<Object, Object> joinStato =  offerta.join(Offerta_.STATO_OFFERTA, JoinType.LEFT);

Path<String> numeroOfferta = offerta.get("numeroOfferta");
Path<String> cliente = offerta.get("cliente").get("denominazione");
Path<String> statoOfferta = offerta.get("statoOfferta").get("descrizione");
Path<String> descrizione = offerta.get("descrizione");
Path<String> rifOffertaEsterno = offerta.get("rifOffertaEsterno");
Path<Date> dataCreazione = offerta.get("dataCreazione");

predicates.add(cb.like(cb.lower(numeroOfferta), cb.lower(searchDescr)));
predicates.add(cb.like(cb.lower(joinCliente.get(Cliente_.DENOMINAZIONE)), cb.lower(searchDescr)));
predicates.add(cb.like(cb.lower(joinStato.get(StatoOfferta_.DESCRIZIONE)), cb.lower(searchDescr)));
predicates.add(cb.like(cb.lower(descrizione), cb.lower(searchDescr)));
predicates.add(cb.like(cb.lower(rifOffertaEsterno), cb.lower(searchDescr)));
```

This will produce a left join. The class JoinType has all the possible join types:
- `INNER`
- `LEFT`
- `RIGHT`
